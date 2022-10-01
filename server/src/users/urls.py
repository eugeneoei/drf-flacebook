from django.urls import path

from .views import UserAvatarUpdateView, UserInfoUpdateView, UserPasswordUpdateView

app_name = "users"
urlpatterns = [
    path("avatar/", UserAvatarUpdateView.as_view({"patch": "partial_update"}), name="user_avatar_update"),
    path("info/", UserInfoUpdateView.as_view({"patch": "partial_update"}), name="user_info_update"),
    path("password/", UserPasswordUpdateView.as_view({"patch": "partial_update"}), name="user_password_update")
]
