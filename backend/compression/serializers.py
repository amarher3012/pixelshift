from rest_framework import serializers

from compression.models import (
    Image,
    CompressedImage,
    Video,
    CompressedVideo,
    CompressionSettings,
)


class ImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the Image model.
    """

    class Meta:
        model = Image
        fields = "__all__"

    def validate(self, data):
        """
        Validate the image file size.
        """

        image = data.get("image")

        # Validates file size
        if image.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Image size exceeds 5MB.")

        # Validates file format
        if image.format.lower() not in [
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tiff",
            "webp",
            "heif",
            "svg",
        ]:
            raise serializers.ValidationError("Not a supported format.")

        return data


class CompressedImageSerializer(serializers.Serializer):
    """
    Serializer for the CompressedImage model.
    """

    class Meta:
        model = CompressedImage
        fields = "__all__"

    def validate(self, data):
        """
        Validate the compressed image
        """
        compressed_image = data.get("compressed_image")

        # Check if compressed file is smaller than original
        if compressed_image.size >= data.get("original_image").size:
            raise serializers.ValidationError(
                "Compression failed - file is not smaller than original."
            )

        # Validates file format
        if compressed_image.format.lower() not in [
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tiff",
            "webp",
            "heif",
            "svg",
        ]:
            raise serializers.ValidationError("Not a supported format.")

        return data
