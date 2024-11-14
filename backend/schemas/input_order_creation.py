from typing import Dict, Tuple
from pydantic import BaseModel, Field


class InputOrderCreation(BaseModel):
    items: Dict[str, Tuple[int, float]] = Field(..., example={"Pizza": (2, 10.0)})
class InputTableOrderCreation(InputOrderCreation):
    table_id: int = Field(..., example=1)
class InputTakeAwayOrderCreation(InputOrderCreation):
    email: str = Field(..., example="hola@gmail.com")