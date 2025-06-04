import os
from django.db import models
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

from accounts.models import User, GuestUser


# Decides where it goes (perm/temp)
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
    description = models.TextField(blank=True, null=True)
    temp = models.BooleanField(default=False, null=True)
    image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    quality = models.IntegerField(default=75)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_user = models.ForeignKey(
        GuestUser, on_delete=models.SET_NULL, null=True, blank=True
    )
    guest_user = models.ForeignKey(
        GuestUser, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return (
            f"Image {self.name} - User: "
            f"{self.user.username if self.user else 'Anonymous'}"
        )

    def save(self, *args, **kwargs):
        image_field = self.image
        if image_field:
            quality = kwargs.pop("quality", self.quality)

            image = Image.open(image_field)
            if image.mode in ("RGBA", "LA"):
                # Convert RGBA to RGB with white background
                background = Image.new("RGB", image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            elif image.mode != "RGB":
                image = image.convert("RGB")

            image_io = BytesIO()
            image.save(image_io, "WEBP", quality=quality, optimize=True)
            image_field.file = ContentFile(
                image_io.getvalue(),
                name=f"{os.path.splitext(image_field.name)[0]}.webp",
            )

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            storage = self.image.storage
            if storage.exists(self.image.name):
                storage.delete(self.image.name)

        super().delete(*args, **kwargs)
