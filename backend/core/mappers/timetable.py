from schemas.timetable import Timetable


def map_mongo_to_timetable_model(mongo_timetable: dict) -> Timetable:
    return Timetable(
        timetable=mongo_timetable["timetable"]
    )
