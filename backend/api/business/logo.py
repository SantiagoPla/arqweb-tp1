from db.models.logo import Logo
from db.repositories.restaurant import RestaurantRepository
from core.dependencies import get_mongo_ds
from services.restaurant import RestaurantService
from fastapi import APIRouter, status, Depends, UploadFile, File


router = APIRouter()

@router.post(
    "/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=Logo
)
async def add_logo_to_restaurant(
    restaurant_id: str,
    input_logo: UploadFile = File(...),
    mongo_ds=Depends(get_mongo_ds)
) -> Logo:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return await restaurant_service.add_logo_to_restaurant(input_logo=input_logo, restaurant_id=restaurant_id)
    
@router.get(
    "/{restaurant_id}",
    status_code=status.HTTP_200_OK,
    response_model=Logo
)
async def get_logo(
    restaurant_id: str,
    mongo_ds=Depends(get_mongo_ds)
) -> Logo:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.get_logo(restaurant_id=restaurant_id)