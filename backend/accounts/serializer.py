from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2", "is_premium"]
        extra_kwargs = {
            "password": {"write_only": True},
            "is_premium": {"read_only": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        validate_password(attrs["password"])
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2", None)
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
