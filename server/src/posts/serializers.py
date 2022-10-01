from app.settings import COMMENTS_PAGE_SIZE
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
        paginator = Paginator(obj.comments.all(), COMMENTS_PAGE_SIZE)
        comments = paginator.page(1)
        serializer = CommentSerializer(comments, many=True)
        number_of_comments = paginator.count
        has_next_page = paginator.num_pages > 1
        return {
            "data": serializer.data,
            "count": number_of_comments,
            "has_next_page": has_next_page
        }
