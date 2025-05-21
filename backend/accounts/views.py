from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenBlacklistView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .models import User
from .serializer import UserSerializer


# TODO: handle email confirmation (https://testdriven.io/blog/django-rest-auth/)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refreshToken")
        if refresh_token:
            try:
                RefreshToken(refresh_token).verify()
                return Response(
                    {"detail": "User is already logged in."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except InvalidToken:
                pass

        if request.user.is_authenticated:
            return Response(
                {"detail": "User is already logged in."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "user": {"username": user.username},
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )

        response.headers["Set-Cookie"] = (
            f"refreshToken={refresh}; HttpOnly; SameSite=None; Secure; Path=/; Partitioned;"
        )

        return response


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refreshToken")
        if refresh_token:
            try:
                RefreshToken(refresh_token).verify()
                return Response(
                    {"detail": "User is already logged in."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except TokenError:
                # Token is invalid or expired, proceed with login
                pass

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "user": {"username": user.username},
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )

        response.headers["Set-Cookie"] = (
            f"refreshToken={refresh}; HttpOnly; SameSite=None; Secure; Path=/; Partitioned;"
        )

        return response


class LogoutView(TokenBlacklistView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refreshToken")
        if not refresh_token:
            return Response(
                {"detail": "No refresh token provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except InvalidToken:
            return Response(
                {"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST
            )

        response = Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT
        )
        response.headers["Set-Cookie"] = (
            "refreshToken=; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=0; Partitioned;"
        )
        return response
