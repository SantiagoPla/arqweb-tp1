from typing import List
from db.models.logo import Logo
from db.models.restaurant import Restaurant
from schemas.input_list_restaurants import InputListRestaurants
from schemas.input_menu_item_creation import InputMenuItemCreation
from schemas.input_create_restaurant import InputCreateRestaurant
from db.repositories.restaurant import RestaurantRepository
from fastapi import UploadFile


class RestaurantService:
   
    def create_restaurant(input_create_restaurant: InputCreateRestaurant, 
                          restaurant_repository: RestaurantRepository) -> str:
        
        restaurant_mongo_id = restaurant_repository.create_restaurant(input_create_restaurant)
       
        return restaurant_mongo_id
            
    def add_menu_item_to_menu(menu_item: InputMenuItemCreation, 
                              restaurant_id: str, 
                              restaurant_repository: RestaurantRepository) -> str:
        
        menu_item_mongo_id = restaurant_repository.add_menu_item_to_menu(menu_item, restaurant_id) 
        
        return menu_item_mongo_id
    
    def list_restaurants(input_list_restaurants: InputListRestaurants,
                         restaurant_repository: RestaurantRepository) -> List[Restaurant]:
        
        return restaurant_repository.list_restaurants(input_list_restaurants)
    
    async def add_logo_to_restaurant(input_logo: UploadFile,
                                     restaurant_id: str,
                                     restaurant_repository:RestaurantRepository) -> Logo:
        
        logo_already_assigned = restaurant_repository.get_logo(restaurant_id=restaurant_id)
        
        if logo_already_assigned:
            raise Exception("Logo already assigned to restaurant")
        
        return await restaurant_repository.add_logo_to_restaurant(input_logo, restaurant_id)