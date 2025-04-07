from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

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
            name = request.data.get("name")
            temp = request.data.get("temp")
            image = request.FILES.get("image")
            quality = request.data.get("quality")
            user = request.user.pk

            # Creates the compressed image instance to pass to the serializer
            compressed_image_instance = {
                "name": name,
                "temp": temp,
                "image": image,
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

    def list(self, request, *args, **kwargs):
        """
        GET endpoint to list all images beloging to the user.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
