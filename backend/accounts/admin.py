from django.contrib import admin

from .models import User, GuestUser

admin.site.register(
    [
        User,
        GuestUser,
    ]
)
