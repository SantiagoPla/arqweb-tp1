from typing import Dict
from pydantic import BaseModel, Field

class InputOrderCreation(BaseModel):
    table_id: int = Field(..., example=1)
    items: Dict[str, int] = Field(..., example={"Pizza": 2})