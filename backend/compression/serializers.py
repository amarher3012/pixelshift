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
        # Don't require image for partial updates (PATCH)
        if self.partial:
            return data

        image = data.get("image")
        if not image:
            raise serializers.ValidationError("An image must be provided.")

        return data
