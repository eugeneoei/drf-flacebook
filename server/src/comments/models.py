import uuid
from django.db import models

from posts.models import Post
from users.models import User


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    # user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=240, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
