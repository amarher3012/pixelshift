from django.urls import path

from compression.views import ImageCompressionView

urlpatterns = [
    path(
        "image-compression/", ImageCompressionView.as_view(), name="image_compression"
    ),
    # path("change-image-format/", ImageCompressionView.as_view(), name="change_image_format"),
    # path("compress-video/", ImageCompressionView.as_view(), name="compress_video"),
    # path("change-video-format/", ImageCompressionView.as_view(), name="change_video_format"),
]
