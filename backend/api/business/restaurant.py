from typing import List
from db.models.logo import Logo
from db.models.restaurant import Restaurant
from schemas.input_list_restaurants import InputListRestaurants
from db.repositories.restaurant import RestaurantRepository
from core.dependencies import get_mongo_ds
from services.restaurant import RestaurantService
from fastapi import APIRouter, status, Query, Depends, UploadFile, File

from schemas.input_create_restaurant import InputCreateRestaurant

router = APIRouter()

@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=str
)
async def create_restaurant(
    input_create_restaurant: InputCreateRestaurant,
    mongo_ds=Depends(get_mongo_ds)
) -> str:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.create_restaurant(input_create_restaurant=input_create_restaurant)


@router.get(
    "/list",
    status_code=status.HTTP_200_OK,
    response_model=List[Restaurant]
)
async def list_restaurants(
    input_list_restaurants: InputListRestaurants = Query(),
    mongo_ds=Depends(get_mongo_ds)
) -> List[Restaurant]:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.list_restaurants(input_list_restaurants=input_list_restaurants)
    
@router.post(
    "/{restaurant_id}/logo",
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
    "/{restaurant_id}/logo",
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