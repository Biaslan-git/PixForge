from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .column_types import intpk, created_at, updated_at, expires_at
from .enums import UserStatus
from ..database.database import Base


class UsersOrm(Base):
    __tablename__ = "users"

    id: Mapped[intpk]
    email: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus, name="user_status_enum"),
        default=UserStatus.ACTIVE,
        nullable=False,
    )
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    tokens: Mapped[list["UserTokensOrm"]] = relationship(
        "UserTokensOrm", back_populates="user", cascade="all, delete-orphan"
    )


class UserTokensOrm(Base):
    __tablename__ = "user_tokens"

    id: Mapped[intpk]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    refresh_token: Mapped[str] = mapped_column(String(512), nullable=False, unique=True)
    created_at: Mapped[created_at]
    expires_at: Mapped[expires_at]

    user: Mapped["UsersOrm"] = relationship("UsersOrm", back_populates="tokens")
