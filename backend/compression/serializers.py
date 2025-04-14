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

    def validate(self, data):
        user = data.get("user")
        temp_image = data.get("temp_image")
        perm_image = data.get("perm_image")

        if not temp_image and not perm_image:
            raise serializers.ValidationError(
                "Either temporary or permanent image must be provided."
            )

        if temp_image and perm_image:
            raise serializers.ValidationError(
                "Cannot provide both temporary and permanent image."
            )

        if temp_image:
            db_image_exists = CompressedImage.objects.filter(
                user=user, temp_image=temp_image
            )
        elif perm_image:
            db_image_exists = CompressedImage.objects.filter(
                user=user, perm_image=perm_image
            )

        if db_image_exists:
            raise serializers.ValidationError("Image with this name already exists.")

        return data
