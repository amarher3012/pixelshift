from rest_framework import serializers


from compression.models import (
    CompressedImage,
)


class CompressedImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompressedImage model.
    """

    class Meta:
        model = CompressedImage
        fields = "__all__"

    # TODO: add more validation
    def validate(self, data):
        image = data.get("image")

        if not image:
            raise serializers.ValidationError("An image must be provided.")

        return data
