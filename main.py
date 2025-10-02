from fastapi import FastAPI
import uvicorn

from auth.router import router as auth_router

from lifespan import lifespan
from config import settings

app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)


@app.get("/")
async def root():
    return {"message": "200"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.DEBUG,
    )
