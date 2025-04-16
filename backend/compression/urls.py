from django.urls import path

from compression.views import ImageCompressionView

urlpatterns = [
    path("upload/", ImageCompressionView.as_view(), name="upload"),
]
