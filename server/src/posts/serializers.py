from base64 import b64encode
from collections import namedtuple
from urllib import parse

from comments.serializers import CommentSerializer
from django.core.paginator import Paginator
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.settings import api_settings
from rest_framework.utils.urls import replace_query_param
from users.serializers import UserSerializer

from .models import Post


class PostSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = SerializerMethodField("get_paginated_comments")

    class Meta:
        model = Post
        fields = ["id", "created_at", "content", "user", "comments"]

    def get_paginated_comments(self, obj):
        # """
        # paginate nested objects using Paginator
        # """
        # # ordering in Comment model determines order of results here as well
        # PAGE_SIZE = api_settings.PAGE_SIZE
        # paginator = Paginator(obj.comments.all(), PAGE_SIZE)
        # comments = paginator.page(1)
        # serializer = CommentSerializer(comments, many=True)
        # number_of_comments = paginator.count
        # has_next_page = paginator.num_pages > 1

        # return {
        #     "results": serializer.data,
        #     "count": number_of_comments,
        #     "next": f"/api/posts/{obj.id}/comments/?page=2" if has_next_page else None
        # }

        """
        paginate nested objects using cursor
        """
        PAGE_SIZE = api_settings.PAGE_SIZE
        comments = obj.comments.all()
        paginator = Paginator(comments, PAGE_SIZE)
        paginated_comments = paginator.page(1)
        serializer = CommentSerializer(paginated_comments, many=True)
        number_of_comments = paginator.count
        next = None

        if len(comments) > PAGE_SIZE:
            last_item = comments[PAGE_SIZE - 1]
            offset = 0
            position = last_item.created_at
            Cursor = namedtuple('Cursor', ['offset', 'reverse', 'position'])
            cursor = Cursor(offset=offset, reverse=False, position=position)

            tokens = {}
            if cursor.offset != 0:
                tokens['o'] = str(cursor.offset)
            if cursor.reverse:
                tokens['r'] = '1'
            if cursor.position is not None:
                tokens['p'] = cursor.position

            querystring = parse.urlencode(tokens, doseq=True)
            encoded = b64encode(querystring.encode('ascii')).decode('ascii')
            base_url = self.context['request'].build_absolute_uri()
            cursor_query_param = 'cursor'
            next = replace_query_param(base_url, cursor_query_param, encoded)

        return {
            "results": serializer.data,
            "count": number_of_comments,
            "next": next
        }
