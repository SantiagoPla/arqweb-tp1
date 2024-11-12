from typing import List
from db.models.menu import MenuItem
from db.models.logo import Logo
from db.models.restaurant import Restaurant
from schemas.input_list_restaurants import InputListRestaurants
from schemas.input_menu_item_creation import InputMenuItemCreation
from schemas.input_create_restaurant import InputCreateRestaurant
from db.repositories.restaurant import RestaurantRepository
from fastapi import UploadFile


class RestaurantService:
   
    def __init__(self, restaurant_repository: RestaurantRepository):

        self._restaurant_repository = restaurant_repository


    def create_restaurant(self, input_create_restaurant: InputCreateRestaurant) -> str:
        
        restaurant_mongo_id = self._restaurant_repository.create_restaurant(input_create_restaurant)
        return restaurant_mongo_id


    def add_menu_item_to_menu(self,
                              menu_item: InputMenuItemCreation, 
                              restaurant_id: str) -> str:
        
        menu_item_mongo_id = self._restaurant_repository.add_menu_item_to_menu(menu_item, restaurant_id) 
        return menu_item_mongo_id
    

    def list_menu_items(self, restaurant_id: str) -> List[MenuItem]:
            
        return self._restaurant_repository.list_menu_items(restaurant_id=restaurant_id)


    def list_restaurants(self,
                         input_list_restaurants: InputListRestaurants) -> List[Restaurant]:
        
        return self._restaurant_repository.list_restaurants(input_list_restaurants)
    

    async def add_logo_to_restaurant(self, 
                                     input_logo: UploadFile,
                                     restaurant_id: str) -> Logo:
        
        logo_already_assigned = self.get_logo(restaurant_id=restaurant_id)
        
        if logo_already_assigned:
            raise Exception("Logo already assigned to restaurant")
        
        return await self._restaurant_repository.add_logo_to_restaurant(input_logo, restaurant_id)


    def get_logo(self, restaurant_id: str)-> Logo:
        
        return self._restaurant_repository.get_logo(restaurant_id=restaurant_id)