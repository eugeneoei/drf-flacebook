from django.shortcuts import get_object_or_404
from posts.models import Post
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Comment
from .permissions import IsCommentOwner
from .serializers import CommentSerializer


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        post_pk = self.kwargs.get("post_pk")
        queryset = queryset.filter(post=post_pk)
        return queryset

    def perform_create(self, serializer):
        post_pk = self.kwargs.get("post_pk")
        post = get_object_or_404(Post, pk=post_pk)
        serializer.save(user=self.request.user, post=post)

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = (AllowAny,)
        elif self.action == "create":
            permission_classes = (IsAuthenticated,)
        else:
            # covers update, partial_update and destroy
            permission_classes = (IsCommentOwner,)

        return [permission() for permission in permission_classes]
