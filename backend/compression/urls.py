from django.urls import path

from compression.views import (
    ImageCompressionView,
    ImageDetailView,
    ImageHubView,
    UserImagesView,
)

urlpatterns = [
    path("upload/", ImageCompressionView.as_view(), name="upload"),
    path("images/", ImageHubView.as_view(), name="images"),
    path("images/<int:pk>/", ImageDetailView.as_view(), name="image_detail"),
    path("user-images/", UserImagesView.as_view(), name="user_images"),
]
