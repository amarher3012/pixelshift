from django.db import models
from django.contrib.auth.models import User


class CompressedImage(models.Model):
    """
    Compressed image model.
    """

    name = models.CharField(max_length=255)
    image = models.ImageField()
    quality = models.IntegerField(default=75)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.name} - User: {self.user.username if self.user else None}"
