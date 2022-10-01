from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Comment
from .permissions import IsCommentOwner
from .serializers import CommentSerializer
from posts.models import Post


# class CommentsPagination(PageNumberPagination):
#     page_size = 2
#     # page_size_query_param = 'page_size'
#     # max_page_size = 10000


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # pagination_class = CommentsPagination

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
