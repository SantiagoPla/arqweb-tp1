from typing import Dict
from pydantic import BaseModel, Field

class OutputOrder(BaseModel):
    restaurant_mongo_id: str = Field(..., example="6722a6e1590f3dd285a31b03")
    table_id: int = Field(..., example=1)
    items: Dict[str, int] = Field(..., example={"Pizza": 2})
    total_price: float = Field(..., example=20.0)
    order_id: str = Field(..., example="5f4b6b3b9b3f4b3b9b3f4b3b")
    status: str = Field(..., example="PENDING")
    created_at: str = Field(..., example="2020-08-29T20:00:00")
    updated_at: str = Field(..., example="2020-08-29T20:00:00")