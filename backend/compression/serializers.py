from rest_framework import serializers

from compression.models import (
    CompressedImage,
)


class CompressedImageSerializer(serializers.Serializer):
    """
    Serializer for the CompressedImage model.
    """

    name = serializers.CharField(max_length=255)
    original_image = serializers.ImageField()
    compressed_image = serializers.ImageField(read_only=True)
    quality = serializers.IntegerField(default=75)
    user = serializers.PrimaryKeyRelatedField(
        queryset=CompressedImage.objects.all(),
        allow_null=True,
    )
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = CompressedImage
        fields = "__all__"

    def validate(self, data):
        """
        Validate the compressed image.
        Args:
            data (dict): The data to validate.
        Returns:
            dict: The validated data.
        Raises:
            ValidationError: If the compressed image is not smaller than the original image.
            ValidationError: If the compressed image format is not supported.
            ValidationError: If the image quality is not higher than 0.
        """
        compressed_image = data.get("compressed_image_instance")

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

        # Validates image quality higher than 0
        if compressed_image.quality <= 0:
            raise serializers.ValidationError("Image quality must be higher than 0.")

        return data
