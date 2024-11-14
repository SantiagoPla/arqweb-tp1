from datetime import datetime
from typing import List
from core.utils import get_bsas_datetime
from schemas.input_order_update import InputOrderUpdate
from schemas.input_list_restaurants import InputListRestaurants
from db.repositories.restaurant import RestaurantRepository
from schemas.input_get_order import InputGetOrder
from db.models.order import Order
from schemas.input_order_creation import InputOrderCreation, InputTableOrderCreation, InputTakeAwayOrderCreation
from db.repositories.order import OrderRepository


class OrderService:
   
    def __init__(self, order_repository: OrderRepository, restaurant_repository: RestaurantRepository = None):

        self._order_repository = order_repository
        self._restaurant_repository = restaurant_repository


    def create_order(self, 
                     restaurant_id: str, 
                     input_order: InputOrderCreation) -> str:
        
        restaurant = self._restaurant_repository.list_restaurants(input_list_restaurants=InputListRestaurants(restaurant_mongo_id=restaurant_id))
        if not restaurant:
            raise ValueError("Restaurant does not exist")
        else:
            restaurant = restaurant[0]

        total_price = sum(value[0]*value[1] for value in input_order.items.values())

        current_datetime = get_bsas_datetime()
        order_data = {"restaurant_mongo_id": restaurant_id,
                       "total_price": total_price,
                       "status": "PENDING",
                       "created_at": current_datetime,
                       "updated_at": current_datetime,
                       "items": input_order.items}

        if isinstance(input_order, InputTableOrderCreation):
            order_data["type"] = "TABLE"
            order_data["client_identifier"] = {"table_id": input_order.table_id}

            if input_order.table_id > restaurant.tables:
                raise ValueError("Table does not exist")
            
        elif isinstance(input_order, InputTakeAwayOrderCreation):
            order_data["type"] = "TAKE_AWAY"
            order_data["client_identifier"] = {"email": input_order.email}
        else:
            raise ValueError("Invalid order type")

        return self._order_repository.create_order(order_data=order_data)



    def get_order(self, input_get_order: InputGetOrder) -> Order:

        return self._order_repository.get_order(input_get_order=input_get_order)


    def get_restaurant_orders(self, restaurant_id: str) -> List[Order]:

        return self._order_repository.get_restaurant_orders(restaurant_id=restaurant_id)
    

    def update_order_status(self, order_id: str, input_order_update: InputOrderUpdate) -> Order:
            
        return self._order_repository.update_order_status(order_id=order_id, 
                                                          new_status=input_order_update.status)