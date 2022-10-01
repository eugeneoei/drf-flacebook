import uuid
from django.db import models

from users.models import User


class Post(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    """
    related_name defines the other side of a relation
    https://www.geeksforgeeks.org/related_name-django-built-in-field-validation/
    """
    user = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content = models.TextField()

    class Meta:
        ordering = ["-created_at"]
