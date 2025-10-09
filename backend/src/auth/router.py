from fastapi import APIRouter, Response, HTTPException
from authx import AuthX
from .config import config
from ..config import settings
from ..logger import logger
from ..database.query.orm import AsyncORM
from .schemas import UserCredentialsDTO, TokenDTO

router = APIRouter(prefix="/auth", tags=["Auth"])
security = AuthX(config=config)


@router.post(
    "/registration",
    status_code=201,
    responses={
        201: {"description": "New user account has been successfully created"},
        400: {"description": "The request is invalid, missing required fields or incorrect data format"},
        409: {"description": "A user with the provided email already exists"},
        500: {"description": "Internal server error"},
    },
)
async def registration(credentials: UserCredentialsDTO, response: Response):
    try:
        user = await AsyncORM.add_user(credentials)
    except HTTPException as e:
        logger.exception(f"Unexpected HTTPException when registering {credentials.email}: {e}")
        raise e
    except Exception as e:
        logger.exception(f"Unexpected Exception when registering {credentials.email}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

    access_token = security.create_access_token(credentials.email)
    refresh_token = security.create_refresh_token(credentials.email)

    response.set_cookie(
        key=config.JWT_ACCESS_COOKIE_NAME,
        value=access_token,
        max_age=config.JWT_ACCESS_TOKEN_EXPIRES,  # type: ignore
        httponly=True,
        secure=settings.MODE == "PROD",
    )

    await AsyncORM.add_refresh_token(refresh_token=refresh_token, user_id=user.id)

    return TokenDTO(access_token=access_token, token_type="bearer")
