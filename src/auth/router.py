from fastapi import APIRouter
from authx import AuthX
from auth.config import config

router = APIRouter()
security = AuthX(config=config)


@router.post("/registration")
async def registration():
    pass
    