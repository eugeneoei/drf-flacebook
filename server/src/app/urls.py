from auth.auth import CustomObtainTokenPairView
from auth.views import AuthDetail
from comments.views import CommentViewSet
from django.contrib import admin
from django.urls import path, include
from posts.views import PostViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import UserCreateRetrieveView

router = DefaultRouter()
router.register(r"api/users", UserCreateRetrieveView, basename="users")
router.register(r"api/posts", PostViewSet, basename="posts")

# value in lookup becomes variable represented in url params => "<lookup_string>_pk"
posts_router = NestedSimpleRouter(router, r"api/posts", lookup="post")
posts_router.register(r"comments", CommentViewSet, basename="post_comments")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("", include(posts_router.urls)),

    path("api/users/<pk>/", include("users.urls")),

    path("api/auth/login/", CustomObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/", AuthDetail.as_view(), name="user_auth"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
