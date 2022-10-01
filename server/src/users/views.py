from pprint import pprint
from django.http import QueryDict
from django.shortcuts import redirect
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, permissions, serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.generics import UpdateAPIView, GenericAPIView
from rest_framework.views import APIView

from .models import User
from .permissions import IsUserObjectOwner
from .serializers import UserSerializer, UserInfoSerializer, UserAvatarSerializer, UserPasswordSerializer

from utils.imagekit import upload_file, delete_file


# from .permissions import IsUserObjectOwner

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        """
        1. the GET and POST attributes are instances of django.http.QueryDict
        2. overwrite create method for validation and uploading of avatar url before object is created
        """
        email = request.data.get("email")
        # first_name = request.data.get("first_name")
        # last_name = request.data.get("last_name")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")
        avatar_file = request.data.pop("avatar", None)

        if self.email_exist(email):
            return Response(
                {"email": ["An account with this email already exist."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not self.password_and_confirm_password_match(password, confirm_password):
            return Response(
                {"password": ["Password and confirm password do not match."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        if avatar_file:
            print("has avatar file")
            avatar_response = upload_file(avatar_file[0], "avatar")
            request.data.__setitem__("avatar", avatar_response["url"])
            request.data.__setitem__("avatar_id", avatar_response["id"])
            request.data.__setitem__("has_avatar", True)

        return super().create(request, *args, **kwargs)

    @staticmethod
    def email_exist(email):
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return False

        return True

    @staticmethod
    def password_and_confirm_password_match(password, confirm_password):
        return password == confirm_password

    def partial_update(self, request, *args, **kwargs):
        # serializer_class = UserInfoSerializer
        kwargs["partial"] = True

        user_object = User.objects.get(email=self.request.user)
        user = UserSerializer(user_object).data
        first_name = user.get("first_name")
        last_name = user.get("last_name")

        # update avatar
        avatar_file = request.data.pop("avatar", None)
        current_avatar_id = None if user.get("avatar_id") == "" else user.get("avatar_id")
        # print("current_avatar_id >>", current_avatar_id)
        if avatar_file:
            serializer = UserAvatarSerializer
            file_name = f"{first_name}-{last_name}-avatar"
            new_avatar = self.update_avatar(current_avatar_id, avatar_file[0], file_name)
            request.data.__setitem__("avatar", new_avatar["url"])
            request.data.__setitem__("avatar_id", new_avatar["id"])
            request.data.__setitem__("has_avatar", True)
            return self.update(request, *args, **kwargs)

        # update password

        # update user info
        # request.data.pop("asd", None)
        data_items = request.data.items()
        print("")
        print("")
        print("type >>", type(request))
        print("data_items >>", data_items)
        allowed_fields = ["email", "first_name", "last_name"]
        sanitised_data = {
            "data": QueryDict("email&first_name&last_name", mutable=True)
        }
        print("sanitised_data >>", sanitised_data)
        for key, value in data_items:
            if key in allowed_fields:
                print("key >>", key)
                print("value >>", value)
                # request.data.pop(key)
                sanitised_data["data"].appendlist(key, value)

        print(request.data)
        print("")
        print("")

        return self.update(sanitised_data, *args, **kwargs)

        # kwargs['partial'] = True
        # return super().create(request, args, kwargs)

        # return Response(
        #     "ok",
        #     status=status.HTTP_200_OK
        # )

    @staticmethod
    def update_avatar(current_avatar_id, file, file_name):
        # delete current file from imageKit
        if current_avatar_id:
            delete_file(current_avatar_id)
            print("delete current avatar from imagekit")

        # uploads new avatar file
        print("upload new avatar")
        return upload_file(file, file_name)

    @staticmethod
    def update_password(new_password, confirm_new_password):
        pass

    def destroy(self, request, *args, **kwargs):
        return Response(
            None,
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def update(self, request, *args, **kwargs):
        return Response(
            None,
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def partial_update(self, request, *args, **kwargs):
        return Response(
            None,
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def get_permissions(self):
        if self.action in ["create", "retrieve", "list"]:
            permission_classes = (permissions.AllowAny,)

        # elif self.action in ["update", "partial_update"]:
        #     print(">>>> permissions partial update")
        #     permission_classes = (IsAuthenticated, IsUserObjectOwner,)
        else:
            permission_classes = ()

        return [permission() for permission in permission_classes]


# class UserPasswordUpdate(UpdateAPIView):
#
#     queryset = User.objects.all()
#     serializer_class = UserPasswordSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#     http_method_names = ["head", "patch"]


class UserAvatarUpdateView(UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserAvatarSerializer
    permission_classes = [IsAuthenticated, IsUserObjectOwner]
    http_method_names = ["head", "patch"]

    @staticmethod
    def update_avatar(current_avatar_id, file, file_name):
        # delete current file from imageKit
        if current_avatar_id:
            delete_file(current_avatar_id)

        # uploads new avatar file
        return upload_file(file, file_name)

    def partial_update(self, request, *args, **kwargs):
        user_object = User.objects.get(email=self.request.user)
        user = UserAvatarSerializer(user_object).data

        avatar_file = request.data.pop("avatar", None)
        current_avatar_id = None if user.get("avatar_id") == "" else user.get("avatar_id")
        if avatar_file:
            new_avatar = self.update_avatar(current_avatar_id, avatar_file[0], "avatar")
            request.data.__setitem__("avatar", new_avatar["url"])
            request.data.__setitem__("avatar_id", new_avatar["id"])
            request.data.__setitem__("has_avatar", True)
            super().partial_update(request, *args, **kwargs)
            return redirect("user_auth")

        return Response(
            {"avatar": ["Avatar file is required."]},
            status=status.HTTP_400_BAD_REQUEST
        )


class UserInfoUpdateView(UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated, IsUserObjectOwner]
    http_method_names = ["head", "patch"]

    def partial_update(self, request, *args, **kwargs):
        super().partial_update(request, *args, **kwargs)
        return redirect("user_auth")


class UserPasswordUpdateView(UpdateModelMixin, GenericViewSet):
    # class UserPasswordUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserPasswordSerializer
    permission_classes = [IsAuthenticated, IsUserObjectOwner]
    http_method_names = ["head", "patch"]

    # # @staticmethod
    # # def update_avatar(current_avatar_id, file, file_name):
    # #     # delete current file from imageKit
    # #     if current_avatar_id:
    # #         delete_file(current_avatar_id)
    # #
    # #     # uploads new avatar file
    # #     return upload_file(file, file_name)
    #

    @staticmethod
    def validate_update_password_fields(data):
        errors = {}
        old_password = data.get("old_password", None)
        new_password = data.get("new_password", None)
        confirm_password = data.get("confirm_new_password", None)

        if not old_password:
            errors["old_password"] = ["This field is required."]

        if not new_password:
            errors["new_password"] = ["This field is required."]

        if not confirm_password:
            errors["confirm_password"] = ["This field is required."]

        return errors

    @staticmethod
    def is_old_password_correct(user, old_password):
        return user.check_password(old_password)

    @staticmethod
    def does_new_password_and_confirm_new_password_match(new_password, confirm_new_password):
        return new_password == confirm_new_password

    def partial_update(self, request, *args, **kwargs):
        validation_errors = self.validate_update_password_fields(request.data)
        if len(validation_errors.keys()) > 0:
            return Response(
                validation_errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        old_password = request.data.get("old_password", None)
        if not self.is_old_password_correct(self.request.user, old_password):
            return Response(
                {"old_password": ["Old password is incorrect."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_password = request.data.get("new_password", None)
        confirm_password = request.data.get("confirm_new_password", None)
        if not self.does_new_password_and_confirm_new_password_match(new_password, confirm_password):
            return Response(
                {"password": ["New password and confirm new password do not match."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.data.__setitem__("password", new_password)

        super().partial_update(request, *args, **kwargs)
        return Response(
            None,
            status=status.HTTP_204_NO_CONTENT
        )

        # return Response(
        #     "ok",
        #     status=status.HTTP_200_OK
        # )
