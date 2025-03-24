from django.contrib import admin

from .models import Image, CompressedImage, Video, CompressedVideo, CompressionSettings

admin.site.register(
    [
        Image,
        CompressedImage,
        Video,
        CompressedVideo,
        CompressionSettings,
    ]
)
