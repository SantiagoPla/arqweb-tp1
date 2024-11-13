from db.models.order import Order
from schemas.input_get_order import InputGetOrder
from db.datasources.mongo_datasource import MongoDataSource
from bson import ObjectId

class OrderRepository:

    def __init__(self, mongo_datasource: MongoDataSource):
        self._mongo_datasource = mongo_datasource

        self._initialize_collection_names()


    def _initialize_collection_names(self):
        self._orders_collection_name = "orders"
    

    def create_order(self, order_data: dict) -> str:
    
        return self._mongo_datasource.insert_one(collection_name=self._orders_collection_name, 
                                                           document=order_data)

    def get_order(self, input_get_order: InputGetOrder) -> Order:
        
        if input_get_order.order_mongo_id:
            query={"_id":ObjectId(input_get_order.order_mongo_id)}


        order = self._mongo_datasource.find_one(collection_name=self._orders_collection_name,
                                               query=query)
        
        return map_mongo_to_order_model(order)