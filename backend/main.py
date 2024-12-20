from fastapi import FastAPI
from core.middlewares.middlewares import add_middlewares
from api.business.restaurant import router as restaurant_router
from api.business.menu import router as menu_router
from api.business.logo import router as logo_router
from api.business.order import router as order_router
from api.user.order import router as user_order_router

app = FastAPI()

add_middlewares(app)

app.include_router(restaurant_router, prefix="/restaurant", tags=["restaurant"])
app.include_router(menu_router, prefix="/menu", tags=["menu"])
app.include_router(logo_router, prefix="/logo", tags=["logo"])
app.include_router(order_router, prefix="/order", tags=["business order"])

app.include_router(user_order_router, prefix="/user/order", tags=["user order"])