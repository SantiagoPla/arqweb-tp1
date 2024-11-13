from schemas.input_create_restaurant import InputCreateRestaurant
from db.datasources.mongo_datasource import MongoDataSource

class OrderRepository:

    def __init__(self, mongo_datasource: MongoDataSource):
        self._mongo_datasource = mongo_datasource

        self._initialize_collection_names()


    def _initialize_collection_names(self):
        self._orders_collection_name = "orders"
    

    def create_order(self, restaurant_id: str, input_order: InputOrderCreation) -> str:
            
    