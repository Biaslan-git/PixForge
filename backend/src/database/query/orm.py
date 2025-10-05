from ..database import async_engine, Base, async_session_factory
from ...auth.schemas import UserCredentialsDTO
from ...auth.models import UsersOrm, UserTokensOrm
from ...auth.security import hashing_password
from sqlalchemy import select
from fastapi import HTTPException, status
from datetime import datetime


class AsyncORM:
    @staticmethod
    async def create_tables():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

    @staticmethod
    async def add_user(credentials: UserCredentialsDTO) -> UsersOrm:
        """Добавляет нового пользователя в базу данных
        Args:
            credentials (UserCredentialsDTO): Данные нового пользователя
        Raises:
            HTTPException: Если пользователь с таким email уже существует
        Returns:
            UsersOrm: Созданный объект пользователя
        """
        async with async_session_factory() as session:
            async with session.begin():
                stmt = select(UsersOrm).where(UsersOrm.email == credentials.email)
                result = await session.execute(stmt)
                user_exist = result.scalar_one_or_none()
                if user_exist:
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="User already exists",
                    )
                hashed_password = hashing_password(credentials.password)
                user = UsersOrm(
                    email=credentials.email,
                    hashed_password=hashed_password,
                )
                session.add(user)
            await session.refresh(user)
            return user

    @staticmethod
    async def add_refresh_token(
        refresh_token: str, user_id: int, expires_at: datetime | None = None
    ):
        """Сохраняет новый refresh-токен для пользователя в базе данных
        Args:
            refresh_token (str): refresh-токен
            user_id (int): ID пользователя
            expires_at (datetime | None, optional): Время истечения токена. Если None то 30 дней
        Returns:
            refresh_token_record: Объект созданной записи токена пользователя
        """
        async with async_session_factory() as session:
            async with session.begin():
                refresh_token_record = UserTokensOrm(
                    user_id=user_id,
                    refresh_token=refresh_token,
                    expires_at=expires_at,
                )
                session.add(refresh_token_record)
            await session.refresh(refresh_token_record)
            return refresh_token_record
