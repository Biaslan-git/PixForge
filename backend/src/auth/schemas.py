from pydantic import BaseModel, EmailStr


class UserCredentialsDTO(BaseModel):
    email: EmailStr
    password: str


class TokenDTO(BaseModel):
    access_token: str
    token_type: str = "bearer"
