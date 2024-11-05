from fastapi import FastAPI
from api.middlewares.middlewares import add_middlewares
from api.external.restaurant import router as restaurant_router

app = FastAPI()

add_middlewares(app)

app.include_router(restaurant_router, prefix="/internal/restaurant", tags=["restaurant"])