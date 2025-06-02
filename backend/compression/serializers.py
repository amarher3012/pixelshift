from rest_framework import serializers
from accounts.serializer import UserSerializer

from compression.models import (
    CompressedImage,
)


class CompressedImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompressedImage model.
    """

    user_details = serializers.SerializerMethodField()
    creator = serializers.SerializerMethodField()

    class Meta:
        model = CompressedImage
        fields = "__all__"

    def get_user_details(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return None

    def get_creator(self, obj):
        if obj.user:
            return obj.user.username
        elif obj.guest_user:
            return f"Guest-{obj.guest_user.guest_id[:8]}"
        return "Anonymous"

    def validate(self, data):
        user = data.get("user")
        image = data.get("image")
        if not image:
            raise serializers.ValidationError("An image must be provided.")

        # Validate quality
        quality = data.get("quality")
        if quality is not None:
            try:
                quality = int(quality)
                if not (1 <= quality <= 100):
                    raise serializers.ValidationError(
                        "Quality must be between 1 and 100"
                    )
            except (TypeError, ValueError):
                raise serializers.ValidationError("Quality must be a valid integer")

        return data

    def save(self, **kwargs):
        instance = super().save(**kwargs)
        if "quality" in kwargs:
            instance.save(quality=kwargs["quality"])
        return instance
