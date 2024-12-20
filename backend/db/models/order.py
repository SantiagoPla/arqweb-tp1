from typing import Any, Dict, Tuple
from pydantic import BaseModel, Field


class Order(BaseModel):
    restaurant_mongo_id: str = Field(..., example="6722a6e1590f3dd285a31b03")
    order_mongo_id: str = Field(..., example="5f4b6b3b9b3f4b3b9b3f4b3b")
    type: str = Field(..., example="TABLE/TAKE_AWAY")
    client_identifier: Dict[str, Any] = Field(..., example={"table_id": 1})
    items: Dict[str, Tuple[int, float]] = Field(..., example={"Pizza": (2, 10.0)})
    total_price: float = Field(..., example=20.0)
    status: str = Field(..., example="PENDING")
    created_at: str = Field(..., example="2020-08-29T20:00:00")
    updated_at: str = Field(..., example="2020-08-29T20:00:00")
