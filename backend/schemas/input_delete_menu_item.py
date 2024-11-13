from pydantic import BaseModel, Field

class InputMenuItemDeletion(BaseModel):
    menu_item_name: str = Field(..., example="Pizza")