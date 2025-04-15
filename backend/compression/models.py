import os
from django.db import models
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

from accounts.models import User, GuestUser


def get_upload_path(instance, filename):
    user = (
        instance.user.id
        if instance.user
        else instance.guest_user.guest_id if instance.guest_user else "Null"
    )
    prefix = "temp" if instance.temp or instance.guest_user else "perm"
    return os.path.join(prefix, f"{user}", filename)


class CompressedImage(models.Model):
    """
    Compressed image model.
    """

    name = models.CharField(max_length=255)
    temp = models.BooleanField(default=False, null=True)
    image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    quality = models.IntegerField(default=75)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    guest_user = models.ForeignKey(
        GuestUser, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Image {self.name} - User: "
            f"{self.user.username if self.user else 'Anonymous'}"
        )

    def save(self, *args, **kwargs):
        image_field = self.image
        if image_field:
            image = Image.open(image_field).convert("RGB")
            image_io = BytesIO()
            image.save(
                image_io, "webp", quality=kwargs.pop("quality", 75), optimize=True
            )
            image_field.file = ContentFile(image_io.getvalue(), name=image_field.name)
            
        super().save(*args, **kwargs)
