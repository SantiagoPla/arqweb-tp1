from typing import List
from schemas.input_delete_menu_item import InputMenuItemDeletion
from db.models.menu import MenuItem
from schemas.input_menu_item_creation import InputMenuItemCreation
from db.repositories.restaurant import RestaurantRepository
from core.dependencies import get_mongo_ds
from services.restaurant import RestaurantService
from fastapi import APIRouter, status, Depends

router = APIRouter()


@router.post(
    "/{restaurant_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=str
)
async def add_menu_item_to_menu(
    restaurant_id: str,
    menu_item: InputMenuItemCreation,
    mongo_ds=Depends(get_mongo_ds)
) -> str:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.add_menu_item_to_menu(menu_item=menu_item, restaurant_id=restaurant_id)


@router.get(
    "/{restaurant_id}",
    status_code=status.HTTP_200_OK,
    response_model=List[MenuItem]
)
async def list_menu_items(
    restaurant_id: str,
    mongo_ds=Depends(get_mongo_ds)
) -> List[MenuItem]:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.list_menu_items(restaurant_id=restaurant_id)


@router.delete(
    "/{restaurant_id}",
    status_code=status.HTTP_200_OK
)
async def delete_menu_item(
    restaurant_id: str,
    input_menu_item: InputMenuItemDeletion,
    mongo_ds=Depends(get_mongo_ds)
) -> None:
    
    restaurant_repository = RestaurantRepository(mongo_ds)
    restaurant_service = RestaurantService(restaurant_repository)
    return restaurant_service.delete_menu_item(restaurant_id=restaurant_id, input_menu_item=input_menu_item)