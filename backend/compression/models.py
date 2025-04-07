import os
from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO


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
        return (
            f"Image {self.name} - User: "
            f"{self.user.username if self.user else 'Anonymous'}"
        )

    def save(self, *args, **kwargs):
        quality = kwargs.pop("quality", 75)
        image = Image.open(self.image)

        if image.mode != "RGB":
            image = image.convert("RGB")

        image_io = BytesIO()
        image.save(image_io, "webp", quality=quality, optimize=True)

        content_file = ContentFile(image_io.getvalue(), name=self.image.name)
        self.image.file = content_file

        super().save(*args, **kwargs)
