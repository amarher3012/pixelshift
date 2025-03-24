from django.db import models


class Image(models.Model):
    """
    Image model.
    """

    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CompressedImage(models.Model):
    """
    Compressed image model.
    """

    image = models.ForeignKey(
        Image, on_delete=models.CASCADE, related_name="compressed_images"
    )
    compressed_image = models.ImageField(upload_to="compressed_images/")
    compression_ratio = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image.name} - {self.compression_ratio}"


class Video(models.Model):
    """
    Video model.
    """

    name = models.CharField(max_length=255)
    video = models.FileField(upload_to="videos/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CompressedVideo(models.Model):
    """
    Compressed video model.
    """

    video = models.ForeignKey(
        Video, on_delete=models.CASCADE, related_name="compressed_videos"
    )
    compressed_video = models.FileField(upload_to="compressed_videos/")
    compression_ratio = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.video.name} - {self.compression_ratio}"


class CompressionSettings(models.Model):
    """
    Compression settings model.
    """

    image_quality = models.IntegerField(default=75)
    video_bitrate = models.IntegerField(default=1000)
    video_resolution = models.CharField(max_length=50, default="1280x720")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image Quality: {self.image_quality}, Video Bitrate: {self.video_bitrate}, Video Resolution: {self.video_resolution}"
