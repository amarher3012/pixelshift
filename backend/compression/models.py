import os
from django.db import models
from django.contrib.auth.models import User
from PIL import Image


def get_upload_path(instance, filename):
    user_id = instance.user.id if instance.user else "anonymous"

    return os.path.join("uploads", f"user_{user_id}", filename)


class CompressedImage(models.Model):
    """
    Compressed image model.
    """

    name = models.CharField(max_length=255)
    temp = models.BooleanField(default=True, blank=True, null=True)
    image = models.ImageField(upload_to=get_upload_path)
    quality = models.IntegerField(default=75)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.name} - User: {self.user.username if self.user else 'Anonymous'}"

    def save(self, *args, **kwargs):
        quality = kwargs.pop("quality", 75)
        super().save(*args, **kwargs)
        image = Image.open(self.image.path)
        image.save(self.image.path, quality=quality, optimize=True)
