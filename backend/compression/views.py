from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone

from compression.models import *
from compression.serializers import *


class ImageCompressionView(generics.ListCreateAPIView):
    """
    API view to upload/list compressed images.
    """

    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        """
        POST endpoint to compress and upload an image.
        """

        try:
            # TODO: work with "guest_user" and set a cookie for the id of that "guest_user"
            # Checks user limits
            user = request.user
            if not user.is_authenticated:
                return Response(
                    {"error": "Authentication required"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            if not getattr(user, "is_premium", False):
                one_hour_ago = timezone.now() - timezone.timedelta(hours=1)
                hourly_uploads = CompressedImage.objects.filter(
                    user=user.pk, created_at__gte=one_hour_ago
                ).count()

                if hourly_uploads >= 5:
                    return Response(
                        {"error": "Free users can only upload 5 images per hour"},
                        status=status.HTTP_403_FORBIDDEN,
                    )

            name = request.data.get("name")
            temp = request.data.get("temp")
            temp_image = request.FILES.get("temp_image")
            perm_image = request.FILES.get("perm_image")
            quality = request.data.get("quality")

            # Creates the compressed image instance to pass to the serializer
            compressed_image_instance = {
                "name": name,
                "temp": temp,
                "temp_image": temp_image,
                "perm_image": perm_image,
                "quality": quality,
                "user": user,
            }

            # Saves the compressed image to the database after validation
            serializer = self.get_serializer(data=compressed_image_instance)
            if serializer.is_valid():
                serializer.save(quality=quality)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
