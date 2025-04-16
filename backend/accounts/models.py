from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_premium = models.BooleanField(default=False)


class GuestUser(models.Model):
    guest_id = models.CharField(max_length=36, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Guest user {self.id}"
