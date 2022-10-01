from django.urls import path

from .views import UserAvatarUpdateView

app_name = "users"
urlpatterns = [
    path("avatar/", UserAvatarUpdateView.as_view({"patch": "partial_update"}), name="avatar_update"),
]
