from fastapi import FastAPI
import uvicorn

from src.auth.router import router as auth_router, security

from src.lifespan import lifespan
from src.config import settings

app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)
security.handle_errors(app=app)


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
