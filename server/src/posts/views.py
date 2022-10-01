from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Post
from .permissions import IsPostOwner
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    """
    # OrderingFilter
    by default, the query parameter is named "ordering"
    it's recommended that you explicitly specify which fields the API should allow in the ordering filter.
    
    # SearchFilter
    The search_fields attribute should be a list of names of text type fields on the model
    such as CharField or TextField.
    """
    filter_backends = [OrderingFilter, SearchFilter]
    ordering_fields = ["created_at"]
    search_fields = ["content", "user__first_name"]

    def get_queryset(self):
        queryset = Post.objects.all()
        user = self.request.query_params.get("user")
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    def perform_create(self, serializer):
        # overwrite perform_create method to set user field in Post to user in request
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = (AllowAny,)
        elif self.action == "create":
            permission_classes = (IsAuthenticated,)
        else:
            # covers update, partial_update and destroy
            permission_classes = (IsPostOwner,)

        return [permission() for permission in permission_classes]
