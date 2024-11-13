from db.models.output_order import Order
from schemas.input_order_creation import InputTableOrderCreation, InputTakeAwayOrderCreation
from db.repositories.order import OrderRepository
from core.dependencies import get_mongo_ds
from services.order import OrderService
from fastapi import APIRouter, status, Depends, Body

router = APIRouter()


@router.post(
    "/table-order/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=Order
)
async def create_table_order(
    restaurant_id: str,
    input_order: InputTableOrderCreation = Body(...),
    mongo_ds=Depends(get_mongo_ds)
) -> str:
    
    order_repository = OrderRepository(mongo_ds)
    order_service = OrderService(order_repository)
    return order_service.create_order(restaurant_id=restaurant_id, input_order=input_order)


@router.post(
    "/take-away-order/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=Order
)
async def create_table_order(
    restaurant_id: str,
    input_order: InputTakeAwayOrderCreation = Body(...),
    mongo_ds=Depends(get_mongo_ds)
) -> str:
    
    order_repository = OrderRepository(mongo_ds)
    order_service = OrderService(order_repository)
    return order_service.create_order(restaurant_id=restaurant_id, input_order=input_order)


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=Order
)
async def get_order(
    input_get_order: InputGetOrder = Body(...),
    mongo_ds=Depends(get_mongo_ds)
) -> str:
    
    order_repository = OrderRepository(mongo_ds)
    order_service = OrderService(order_repository)
    return order_service.get_order(input_get_order=input_get_order)