from rest_framework import serializers

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

from utils.exceptions import APIException400
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
        # extra_kwargs = {
        #     "password": {
        #         "write_only": True
        #     }
        # }

    # create method here is necessary in order for password to be hashed
    def create(self, validated_data):
        # print("serializer create")
        # print(validated_data)
        return User.objects.create_user(**validated_data)

    # def validate_password_and_confirm_password_match(self, password, confirm_password):
    #     if not password == confirm_password:
    #         raise serializers.ValidationError({
    #             'error': 'Password and confirm password do not match.'
    #         })
    #     return
    #
    # def validate(self, attrs):
    #     print("serializer validate")
    #     print("type >>>", type(attrs))
    #     """
    #     validate that:
    #     1. password and confirm_password match
    #     2. email does not exist in DB
    #     """
    #     data = self.context.get("request").data
    #     password = data.get("password")
    #     confirm_password = data.get("confirm_password", None)
    #     # email = data.get("email")
    #
    #     self.validate_password_and_confirm_password_match(password, confirm_password)
    #
    #     return super().validate(attrs)


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
