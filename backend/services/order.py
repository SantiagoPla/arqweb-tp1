from db.models.order import Order
from schemas.input_order_creation import InputOrderCreation
from db.repositories.order import OrderRepository


class OrderService:
   
    def __init__(self, order_repository: OrderRepository):

        self._order_repository = order_repository


    def create_order(self, restaurant_id: str, input_order: InputOrderCreation) -> Order:
        
        order_mongo_id = self._order_repository.create_order(restaurant_id, input_order)
        return order_mongo_id