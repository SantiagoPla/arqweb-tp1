from pydantic import BaseModel, Field


class Logo(BaseModel):
    mongo_id: str = Field(...)
    filename: str = Field(...)
    content_type: str = Field(...)
    data: bytes = Field(...)
    restaurant_id: str = Field(...)
