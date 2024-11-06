from db.models.logo import Logo

def map_dict_to_logo_model(logo_data: dict, logo_mongo_id: str) -> Logo:
    return Logo(
        mongo_id=logo_mongo_id,
        filename=logo_data["filename"],
        content_type=logo_data["content_type"],
        data=logo_data["data"],
        restaurant_id=logo_data["restaurant_mongo_id"]
    )
