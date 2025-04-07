from rest_framework import serializers, status
from rest_framework.response import Response


from compression.models import (
    CompressedImage,
)


# TODO: Validation
class CompressedImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompressedImage model.
    """

    class Meta:
        model = CompressedImage
        fields = "__all__"

    def validate(self, data):
        user = data.get("user")
        image = data.get("image")

        db_image_exists = CompressedImage.objects.filter(user=user, image=image)

        if not image:
            raise serializers.ValidationError("Image was not provided.")

        if db_image_exists:
            raise serializers.ValidationError("Image with this name already exists.")

        return data
