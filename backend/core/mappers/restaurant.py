from db.models.restaurant import Restaurant



def map_mongo_to_restaurant_model(mongo_restaurant: dict) -> Restaurant:
    return Restaurant(
        mongo_id=str(mongo_restaurant["_id"]),
        name=mongo_restaurant["name"],
        latitude=mongo_restaurant["latitude"],
        longitude=mongo_restaurant["longitude"],
        tables=mongo_restaurant["tables"],
        address=mongo_restaurant["address"],
        phone_number=mongo_restaurant["phone_number"],
        email=mongo_restaurant.get("email"),
        instagram=mongo_restaurant.get("instagram"),
        opening_time=mongo_restaurant["opening_time"],
        closing_time=mongo_restaurant["closing_time"]
    )
