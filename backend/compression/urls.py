from django.urls import path

from compression.views import ImageCompressionView

urlpatterns = [
    path(
        "image-compression/", ImageCompressionView.as_view(), name="image_compression"
    ),
]
