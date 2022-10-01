from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    # declaring a field as write_only ensures field is not returned in response
    # by default, required is True
    password = serializers.CharField(write_only=True)
    avatar_id = serializers.CharField(required=False, write_only=True)
    has_avatar = serializers.BooleanField(required=False, write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "avatar",
            "avatar_id",
            "has_avatar"
        ]

    # create method here is necessary in order for password to be hashed
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserAvatarSerializer(serializers.ModelSerializer):
    # not declaring serializer for field means read and write allowed
    class Meta:
        model = User
        fields = [
            "avatar",
            "avatar_id",
            "has_avatar"
        ]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name"
        ]


class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance
