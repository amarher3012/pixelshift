from abc import ABC
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from PIL import Image

from compression.models import *
from compression.serializers import *


class ImageCompressionView(generics.ListCreateAPIView):
    """
    API view to upload a compressed image.
    Args:
        name (str): The name of the image.
        image (Image): The image file to be uploaded.
        user (User): The user who uploaded the image.
        image_quality (float): The image quality setting.
        date (datetime): The date when the image was uploaded.

    Returns:
        Response: A JSON response containing the image details to later use in the compression view.
    """

    queryset = CompressedImage.objects.all()
    serializer_class = CompressedImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        """
        Handle the POST request to upload a compressed image.
        Args:
            request (Request): The request object containing the image file and user.

        Returns:
            Response: A JSON response containing the image details.
        """

        try:
            name = request.data.get("name")
            temp = request.data.get("temp")
            image = request.FILES.get("image")
            quality = request.data.get("quality")
            user = request.user.pk

            # TODO: compress image

            if not image:
                return Response(
                    {"error": "No image provided."}, status=status.HTTP_400_BAD_REQUEST
                )

            # TODO: check if image name already exists

            # Create a new CompressedImage instance
            compressed_image_instance = {
                "name": name,
                "temp": temp,
                "image": image,
                "quality": quality,
                "user": user,
            }

            # TODO: set image route to user's id

            # Save the compressed image to the database
            serializer = self.get_serializer(data=compressed_image_instance)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def list(self, request, *args, **kwargs):
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
