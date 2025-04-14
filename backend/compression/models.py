import os
from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from storages.backends.s3 import S3Storage
from PIL import Image
from io import BytesIO


class PermStorage(S3Storage):
    bucket_name = "perm"
    location = "uploads"


def get_upload_path(instance, filename):
    user_id = instance.user.id if instance.user else "anonymous"

    return os.path.join(f"user_{user_id}", filename)


class CompressedImage(models.Model):
    """
    Compressed image model.
    """

    name = models.CharField(max_length=255)
    temp = models.BooleanField(default=False, null=True)
    temp_image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    perm_image = models.ImageField(
        upload_to=get_upload_path, storage=PermStorage, blank=True, null=True
    )
    quality = models.IntegerField(default=75)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Image {self.name} - User: "
            f"{self.user.username if self.user else 'Anonymous'}"
        )

    def save(self, *args, **kwargs):
        image_field = self.temp_image if self.temp else self.perm_image
        if image_field:
            image = Image.open(image_field).convert("RGB")
            image_io = BytesIO()
            image.save(
                image_io, "webp", quality=kwargs.pop("quality", 75), optimize=True
            )
            image_field.file = ContentFile(image_io.getvalue(), name=image_field.name)
        super().save(*args, **kwargs)
