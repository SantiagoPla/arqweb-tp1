from typing import Any, Dict, Optional, Union
from pydantic import BaseModel, Field, model_validator
from typing_extensions import Self
import json

class InputGetOrder(BaseModel):
    order_mongo_id: Optional[str] = Field(None, example="5f4b6b3b9b3f4b3b9b3f4b3b")
    
    restaurant_mongo_id: Optional[str] = Field(None, example="6722a6e1590f3dd285a31b03")
    client_identifier_value: Union[str, int] = Field(None, example="hola@gmail.com")
    type: Optional[str] = Field(None, example="TABLE/TAKE_AWAY")
    

    @model_validator(mode="after")
    def check_order_id_or_others(self) -> Self:
        if not self.order_mongo_id and (not self.restaurant_mongo_id 
                                        and not self.client_identifier_value
                                        and not self.type):
            raise ValueError("O bien se debe proveer id de pedido, o el conjunto (id de restaurante, tipo de pedido, e identificador de cliente)")
        
        return self