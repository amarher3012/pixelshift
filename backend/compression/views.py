import uuid
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.utils import timezone

from .models import GuestUser, CompressedImage
from .serializers import CompressedImageSerializer


class ImageCompressionView(generics.ListCreateAPIView):
    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            guest_user = None
            response = Response()

            # Handle GuestUser if not authenticated
            if not user.is_authenticated:
                guest_id = request.COOKIES.get("guest_id")
                if guest_id:
                    try:
                        guest_user = GuestUser.objects.get(guest_id=guest_id)
                    except GuestUser.DoesNotExist:
                        guest_id = None
                if not guest_id:
                    guest_id = str(uuid.uuid4())
                    guest_user = GuestUser.objects.create(guest_id=guest_id)
                    response.set_cookie("guest_id", guest_id)
            else:
                guest_user = None

            # Apply upload limits
            one_hour_ago = timezone.now() - timezone.timedelta(hours=1)
            if user.is_authenticated and not getattr(user, "is_premium", False):
                hourly_uploads = CompressedImage.objects.filter(
                    user=user, created_at__gte=one_hour_ago
                ).count()
                if hourly_uploads >= 5:
                    return Response(
                        {"error": "Free users can only upload 5 images per hour"},
                        status=status.HTTP_403_FORBIDDEN,
                    )
            elif guest_user:
                hourly_uploads = CompressedImage.objects.filter(
                    guest_user=guest_user, created_at__gte=one_hour_ago
                ).count()
                if hourly_uploads >= 5:
                    return Response(
                        {"error": "Guests can only upload 5 images per hour"},
                        status=status.HTTP_403_FORBIDDEN,
                    )

            # Gather data
            name = request.data.get("name")
            temp = request.data.get("temp")
            temp_image = request.FILES.get("temp_image")
            perm_image = request.FILES.get("perm_image")
            quality = request.data.get("quality")

            # Create compressed image instance
            compressed_image_instance = {
                "name": name,
                "temp": temp,
                "temp_image": temp_image,
                "perm_image": perm_image,
                "quality": quality,
            }
            if user.is_authenticated:
                compressed_image_instance["user"] = user.pk
            else:
                compressed_image_instance["guest_user"] = guest_user.pk

            # Save via serializer
            serializer = self.get_serializer(data=compressed_image_instance)
            if serializer.is_valid():
                serializer.save(quality=quality)
                response.data = serializer.data
                response.status_code = status.HTTP_201_CREATED
                return response

            response.data = serializer.errors
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ImageHubView(generics.ListAPIView):
    pass
