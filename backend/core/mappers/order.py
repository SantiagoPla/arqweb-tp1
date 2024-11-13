from db.models.menu import Order


def map_mongo_to_order_model(order: dict) -> Order:
    return Order(
        order_mongo_id=str(order["_id"]),
        restaurant_mongo_id=order["restaurant_mongo_id"],
        total_price=order["total_price"],
        status=order["status"],
        created_at=order["created_at"],
        updated_at=order["updated_at"],
        client_identifier=order["client_identifier"],
        type=order["type"]
    )