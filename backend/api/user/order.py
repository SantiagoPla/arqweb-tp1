from db.models.output_order import Order
from schemas.input_order_creation import InputOrderCreation
from db.repositories.restaurant import RestaurantRepository
from core.dependencies import get_mongo_ds
from services.restaurant import RestaurantService
from fastapi import APIRouter, status, Depends, Body

router = APIRouter()


@router.post(
    "/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=Order
)
async def create_order(
    restaurant_id: str,
    input_order: InputOrderCreation = Body(...),
    mongo_ds=Depends(get_mongo_ds)
) -> Order:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.create_order(restaurant_id=restaurant_id, table_id=table_id, input_order=input_order)
