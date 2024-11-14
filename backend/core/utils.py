from datetime import datetime
import pytz

def get_bsas_datetime():
    bsas_timezone = pytz.timezone('America/Argentina/Buenos_Aires')
    return datetime.now(bsas_timezone).isoformat()
