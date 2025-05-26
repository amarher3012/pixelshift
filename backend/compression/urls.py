from django.urls import path

from compression.views import ImageCompressionView, ImageDetailView, ImageHubView

urlpatterns = [
    path("upload/", ImageCompressionView.as_view(), name="upload"),
    path("images/", ImageHubView.as_view(), name="image-hub"),
    path("images/<int:pk>/", ImageDetailView.as_view(), name="image-detail"),
]
