from typing import Dict
from pydantic import BaseModel, Field


class InputOrderCreation(BaseModel):
    items: Dict[str, int] = Field(..., example={"Pizza": 2})
class InputTableOrderCreation(InputOrderCreation):
    table_id: int = Field(..., example=1)
class InputTakeAwayOrderCreation(InputOrderCreation):
    email: str = Field(..., example="hola@gmail.com")