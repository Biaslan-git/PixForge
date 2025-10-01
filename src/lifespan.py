from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.query.orm import AsyncORM


@asynccontextmanager
async def lifespan(app: FastAPI):
    await AsyncORM.create_tables()  # стартовое действие
    yield
    # сюда можно добавить cleanup, если нужно