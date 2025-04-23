from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    # TODO: add more fields
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()

        return user

    # def validate(self, validated_data):
    #     # TODO: check for existing user and raise specific error
    #     pass
