import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone

from app.settings import PLACEHOLDER_ACCOUNT_IMAGE

from .managers import UserManager


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="email address", unique=True)
    first_name = models.CharField(max_length=150, verbose_name="first name")
    last_name = models.CharField(max_length=150, verbose_name="last name")
    avatar = models.URLField(default=PLACEHOLDER_ACCOUNT_IMAGE)
    avatar_id = models.CharField(max_length=150, blank=True)
    has_avatar = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
