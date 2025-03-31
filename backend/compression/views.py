import boto3, os
from abc import ABC
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from PIL import Image

from compression.models import *
from compression.serializers import *


class ImageSaver(ABC):

    def image_saver(type):
        pass


class ImageCompressionView(generics.GenericAPIView):
    """
    API view to upload a compressed image.
    Args:
        name (str): The name of the image.
        image (File): The image file to be uploaded.
        user (User): The user who uploaded the image.
        image_quality (float): The image quality setting.
        date (datetime): The date when the image was uploaded.

    Returns:
        Response: A JSON response containing the image details to later use in the compression view.
    """

    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to upload a compressed image.
        Args:
            request (Request): The request object containing the image file and user.

        Returns:
            Response: A JSON response containing the image details.
        """
        # TODO:
        try:
            name = request.data.get("name")
            image = request.FILES.get("image")
            user = request.user
            quality = request.data.get("quality")

            if not image:
                return Response(
                    {"error": "No image provided."}, status=status.HTTP_400_BAD_REQUEST
                )

            # call image save function

            # TODO: Compress image, save temporarily, send to storage
            # Compress image with .save() - It saves to temp folder
            # Serialize and verify everything needed
            # Once verified, send image to storage with given path

            # Create a new CompressedImage instance
            compressed_image_instance = CompressedImage.objects.create(
                name=name,
                image=image.name,  # Path to compressed image
                quality=quality,
                user=user,
            )

            # Save the compressed image to the database
            serializer = self.get_serializer(compressed_image_instance)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, *args, **kwargs):
        """
        Handle the GET request to retrieve all compressed images.
        Args:
            request (Request): The request object.

        Returns:
            Response: A JSON response containing the list of compressed images.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
