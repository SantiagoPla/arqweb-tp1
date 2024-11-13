from typing import Dict
from pydantic import BaseModel, Field

class InputOrderCreation(BaseModel):
    restaurant_mongo_id: str = Field(..., example="6722a6e1590f3dd285a31b03")
    table_id: int = Field(..., example=1)
    items: Dict[str, int] = Field(..., example={"Pizza": 2})