from django.shortcuts import render
from rest_framework import APIView
from rest_framework.response import Response
from PIL import Image

from compression.models import (
    Image,
    CompressedImage,
    Video,
    CompressedVideo,
    CompressionSetting,
)
