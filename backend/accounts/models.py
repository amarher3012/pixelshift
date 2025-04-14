from django.db import models
from django.contrib.auth.models import AbstractUser, AnonymousUser


class User(AbstractUser):
    is_premium = models.BooleanField(default=False)


class GuestUser(models.Model):
    guest_id = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
