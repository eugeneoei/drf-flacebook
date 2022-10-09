from app.settings import PAGE_SIZE
from comments.serializers import CommentSerializer
from django.core.paginator import Paginator
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from users.serializers import UserSerializer

from .models import Post


class PostSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = SerializerMethodField("get_paginated_comments")

    class Meta:
        model = Post
        fields = ["id", "created_at", "content", "user", "comments"]

    def get_paginated_comments(self, obj):
        # ordering in Comment model determines order of results here as well
        paginator = Paginator(obj.comments.all(), PAGE_SIZE)
        comments = paginator.page(1)
        serializer = CommentSerializer(comments, many=True)
        number_of_comments = paginator.count
        has_next_page = paginator.num_pages > 1
        return {
            "results": serializer.data,
            "count": number_of_comments,
            "next": f"/api/posts/{obj.id}/comments/?page=2" if has_next_page else None
        }
