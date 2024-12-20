from typing import Any, Dict, List, Optional
from core.mappers.menu import map_mongo_to_menu_item_model
from db.models.menu import MenuItem
from core.mappers.logo import map_dict_to_logo_model, map_mongo_to_logo_model
from db.models.logo import Logo
from schemas.input_list_restaurants import InputListRestaurants
from core.mappers.restaurant import map_mongo_to_restaurant_model
from db.models.restaurant import Restaurant
from schemas.input_menu_item_creation import InputMenuItemCreation
from schemas.input_create_restaurant import InputCreateRestaurant
from db.datasources.mongo_datasource import MongoDataSource
from fastapi import UploadFile
from bson import ObjectId
import base64

class RestaurantRepository:

    def __init__(self, mongo_datasource: MongoDataSource):
        self._mongo_datasource = mongo_datasource

        self._initialize_collection_names()


    def _initialize_collection_names(self):
        self._restaurants_collection_name = "restaurants"
        self._menus_collection_name = "menus"
        self._logos_collection_name = "logos"


    def create_restaurant(self, input_create_restaurant: InputCreateRestaurant) -> str:
                
        restaurant_mongo_id = self._mongo_datasource.insert_one(collection_name=self._restaurants_collection_name, 
                                                                document=input_create_restaurant.dict())
        
        self._create_menu(restaurant_mongo_id=restaurant_mongo_id)
        
        return restaurant_mongo_id
    
    
    def _create_menu(self, restaurant_mongo_id: str) -> str:
        menu = {"restaurant_mongo_id":restaurant_mongo_id, 
                "items":[]}
        
        return self._mongo_datasource.insert_one(collection_name=self._menus_collection_name,
                                                 document=menu)
    
    
    def add_menu_item_to_menu(self, 
                              menu_item: InputMenuItemCreation, 
                              restaurant_id: str) -> str:
        
        menu_item_document = menu_item.dict()
        menu_mongo_id = self.get_menu_mongo_id(restaurant_id=restaurant_id)
        
        menu_item_document["menu_mongo_id"] = menu_mongo_id
        
        self._mongo_datasource.update_one(collection_name=self._menus_collection_name,
                                          query={"_id":ObjectId(menu_mongo_id)},
                                          update={"$push":{"items":menu_item_document}})

        return menu_mongo_id
        
        
    def get_menu_mongo_id(self, restaurant_id: str) -> str:
        menu = self._mongo_datasource.find_one(collection_name=self._menus_collection_name,
                                               query={"restaurant_mongo_id":restaurant_id})
        
        return str(menu["_id"])
    

    def list_restaurants(self, input_list_restaurants: InputListRestaurants) -> List[Restaurant]:
        
        query = {}
        
        if input_list_restaurants.name:
            query["name"] = input_list_restaurants.name
        
        if input_list_restaurants.restaurant_mongo_id:
            query["_id"] = ObjectId(input_list_restaurants.restaurant_mongo_id)
        
        restaurants = self._mongo_datasource.find_many(collection_name=self._restaurants_collection_name,
                                                        query=query)
        
        return [map_mongo_to_restaurant_model(restaurant) for restaurant in restaurants]
        
        
    async def add_logo_to_restaurant(self, 
                               input_logo: UploadFile,
                               restaurant_id: str) -> Logo:
        
        file_bytes = await input_logo.read()
        logo_data = {
            "filename": input_logo.filename,
            "content_type": input_logo.content_type,
            "data": base64.b64encode(file_bytes),
            "restaurant_mongo_id": restaurant_id
        }
        
        logo_mongo_id = self._mongo_datasource.insert_one(collection_name=self._logos_collection_name,
                                                          document=logo_data)
        
        return map_dict_to_logo_model(logo_data, logo_mongo_id)
    
    def get_logo(self, restaurant_id: str) -> Optional[Logo]:
        
        mongo_logo = self._mongo_datasource.find_one(collection_name=self._logos_collection_name, 
                                               query={"restaurant_mongo_id":restaurant_id})
        
        if mongo_logo is None:
            return None
        
        return map_mongo_to_logo_model(mongo_logo)


    def list_menu_items(self, restaurant_id: str) -> List[MenuItem]:
            
        menu_mongo_id = self.get_menu_mongo_id(restaurant_id=restaurant_id)
        
        menu = self._mongo_datasource.find_one(collection_name=self._menus_collection_name,
                                               query={"_id": ObjectId(menu_mongo_id)})
        
        return [map_mongo_to_menu_item_model(menu_item) for menu_item in menu["items"]]
    

    def delete_menu_item(self,
                            restaurant_id: str,
                            menu_item_name: str) -> None:
            
            menu_mongo_id = self.get_menu_mongo_id(restaurant_id=restaurant_id)
            
            self._mongo_datasource.update_one(collection_name=self._menus_collection_name,
                                              query={"_id":ObjectId(menu_mongo_id)},
                                              update={"$pull":{"items":{"name":menu_item_name}}})