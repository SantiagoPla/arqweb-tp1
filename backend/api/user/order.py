from schemas.output_order import OutputOrder
from schemas.input_order_creation import InputOrderCreation
from db.repositories.restaurant import RestaurantRepository
from core.dependencies import get_mongo_ds
from services.restaurant import RestaurantService
from fastapi import APIRouter, status, Depends

router = APIRouter()


@router.post(
    "/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=OutputOrder
)
async def create_order(
    restaurant_id: str,
    table_id: int,
    input_order: InputOrderCreation,
    mongo_ds=Depends(get_mongo_ds)
) -> OutputOrder:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.create_order(restaurant_id=restaurant_id, table_id=table_id, input_order=input_order)
