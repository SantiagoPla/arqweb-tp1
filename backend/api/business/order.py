
from typing import List
from schemas.input_order_update import InputOrderUpdate
from db.repositories.order import OrderRepository
from services.order import OrderService
from db.models.order import Order
from core.dependencies import get_mongo_ds
from fastapi import APIRouter, status, Depends, Body

router = APIRouter()

@router.get(
    "/{restaurant_id}",
    status_code=status.HTTP_200_OK,
    response_model=List[Order]
)
async def get_order(
    restaurant_id: str,
    mongo_ds=Depends(get_mongo_ds)
) -> List[Order]:
    
    order_repository = OrderRepository(mongo_ds)
    order_service = OrderService(order_repository)
    return order_service.get_restaurant_orders(restaurant_id=restaurant_id)


@router.patch(
    "/order-status/{restaurant_id}/{order_id}",
    status_code=status.HTTP_200_OK,
    response_model=Order
)
async def update_order_status(
    restaurant_id: str,
    order_id: str,
    input_order_update: InputOrderUpdate = Body(...),
    mongo_ds=Depends(get_mongo_ds)
) -> Order:
    
    order_repository = OrderRepository(mongo_ds)
    order_service = OrderService(order_repository)
    return order_service.update_order_status(order_id=order_id, input_order_update=input_order_update)