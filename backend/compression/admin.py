from django.contrib import admin

from .models import CompressedImage

admin.site.register(
    [
        CompressedImage,
    ]
)
