from pydantic import Field, BaseModel 

class InputOrderUpdate(BaseModel):
    status: str = Field(..., example="Lista")

