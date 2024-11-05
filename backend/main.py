from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.external.restaurant import router as restaurant_router
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(restaurant_router, prefix="/internal/restaurant", tags=["restaurant"])