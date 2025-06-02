import uuid
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from django.db import models

from .models import GuestUser, CompressedImage
from .serializers import CompressedImageSerializer


class ImageCompressionView(generics.ListCreateAPIView):
    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

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
                response.delete_cookie("guest_id")

            # Apply upload limits
            one_hour_ago = timezone.now() - timezone.timedelta(hours=1)
            if user.is_authenticated and not getattr(user, "is_premium", False):
                hourly_uploads = CompressedImage.objects.filter(
                    user=user, created_at__gte=one_hour_ago
                ).count()
                if hourly_uploads >= 25:
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
            image = request.FILES.get("image")
            quality = request.data.get("quality")
            is_public = request.data.get("is_public", "true").lower() == "true"

            # Create compressed image instance
            compressed_image_instance = {
                "name": name,
                "temp": temp,
                "image": image,
                "quality": quality,
                "is_public": is_public,
            }

            if user.is_authenticated:
                compressed_image_instance["user"] = user.pk
            else:
                compressed_image_instance["guest_user"] = guest_user.pk

            serializer = self.get_serializer(data=compressed_image_instance)
            if serializer.is_valid():
                try:
                    quality = int(quality)
                    if not (1 <= quality <= 100):
                        raise ValueError("Quality must be between 1 and 100")
                except (TypeError, ValueError):
                    quality = 75  # default if invalid

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
    serializer_class = CompressedImageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = CompressedImage.objects.all().order_by("-created_at")
        user = self.request.user

        # Image viewing permissions
        if user.is_authenticated:
            return queryset.filter(models.Q(is_public=True) | models.Q(user=user))
        else:
            return queryset.filter(is_public=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        guest_id = request.COOKIES.get("guest_id")

        # Edit permissions
        if user.is_authenticated:
            if instance.user != user:
                return Response(
                    {"error": "You don't have permission to edit this image"},
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif (
            guest_id
            and instance.guest_user
            and instance.guest_user.guest_id == guest_id
        ):
            pass
        else:
            return Response(
                {"error": "You don't have permission to edit this image"},
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data.copy()
        allowed_fields = ["name", "description"]
        for key in list(data.keys()):
            if key not in allowed_fields:
                data.pop(key)

        serializer = self.get_serializer(instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        guest_id = request.COOKIES.get("guest_id")

        # Delete permissions
        if user.is_authenticated:
            if instance.user != user:
                return Response(
                    {"error": "You don't have permission to delete this image"},
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif (
            guest_id
            and instance.guest_user
            and instance.guest_user.guest_id == guest_id
        ):
            pass
        else:
            return Response(
                {"error": "You don't have permission to delete this image"},
                status=status.HTTP_403_FORBIDDEN,
            )

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        guest_id = self.request.COOKIES.get("guest_id")

        if user.is_authenticated:
            return queryset.filter(models.Q(is_public=True) | models.Q(user=user))
        elif guest_id:
            return queryset.filter(
                models.Q(is_public=True) | models.Q(guest_user__guest_id=guest_id)
            )

        return queryset.filter(is_public=True)


class UserImagesView(generics.ListAPIView):
    serializer_class = CompressedImageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CompressedImage.objects.filter(user=self.request.user).order_by(
            "-created_at"
        )
