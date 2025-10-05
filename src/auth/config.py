from authx import AuthXConfig
from ..config import settings
from datetime import timedelta

config = AuthXConfig(
    JWT_SECRET_KEY=settings.JWT_SECRET_KEY,
    JWT_ALGORITHM=settings.JWT_ALGORITHM,
    JWT_ACCESS_COOKIE_NAME="pixforge_access_token",
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(
        minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    ),
    JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS),
    JWT_TOKEN_LOCATION=["cookies"],
)
