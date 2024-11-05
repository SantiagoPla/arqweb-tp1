from fastapi import FastAPI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware
from core.settings import ProjectSettings

project_settings = ProjectSettings()


def add_cors_middleware(app: FastAPI, origins: list):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
        allow_headers=["*"],  # Allow all headers
    )

def add_rate_limiting_middleware(app: FastAPI):
    limiter = Limiter(
        key_func=get_remote_address,
        default_limits=["1000/day", "15/minute"]
    )
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)

def add_middlewares(app: FastAPI):
    origins = [project_settings.FrontendURL]
    add_cors_middleware(app, origins)
    add_rate_limiting_middleware(app)
