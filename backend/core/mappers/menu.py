from db.models.menu import MenuItem


def map_mongo_to_menu_item_model(menu_item: dict) -> MenuItem:
    return MenuItem(
        menu_mongo_id=str(menu_item["menu_mongo_id"]),
        name=menu_item["name"],
        description=menu_item["description"],
        price=menu_item["price"]
    )