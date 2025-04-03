from rest_framework import serializers

from compression.models import (
    CompressedImage,
)


# TODO: validation
class CompressedImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompressedImage model.
    """

    class Meta:
        model = CompressedImage
        fields = "__all__"
