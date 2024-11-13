from typing import Any, Dict, Optional
from pydantic import BaseModel, Field

class InputGetOrder(BaseModel):
    order_mongo_id: Optional[str] = Field(..., example="5f4b6b3b9b3f4b3b9b3f4b3b")
    restaurant_mongo_id: Optional[str] = Field(..., example="6722a6e1590f3dd285a31b03")
    client_identifier: Optional[Dict[str, Any]] = Field(..., example={"table_id": 1})
    email: Optional[str] = Field(None, example="hola@gmail.com")