import base64
import logging
from datetime import datetime, timedelta
import json
from models.Models import TokenModel
import jwt
from db.DatabaseConnect import DatabaseConnect
import uuid


def gen_access_token(user: TokenModel):
    try:
        exp = datetime.now() + timedelta(days=1)
        user.exp = int(exp.timestamp())
        raw_payload = user.toJSON()
        payload = json.loads(raw_payload)
        # payload = json.dumps(raw_payload, indent = 4)
        return jwt.encode(payload, "secret", algorithm="HS256")
    except Exception as e:
        logging.error(e)
        return "null"


def gen_refresh_token(user_id):
    logging.error(user_id)
    db = DatabaseConnect()
    con = db.conn()
    cursor = con.cursor()
    cuid = uuid.uuid4()
    expiration_days = timedelta(days=20)
    exp_current = datetime.now()
    exp = exp_current + expiration_days
    query = f"insert into tokens (uuid, user_id, exp) values (%s,%s, %s)"
    cursor.execute(query, (cuid, user_id, exp))
    con.commit()
    con.close()
    refresh_token = base64.b64encode(bytes(f"{cuid}:{user_id}", 'utf-8'))
    return refresh_token.decode("utf-8")


def revoke_refresh_token(token):
    db = DatabaseConnect()
    raw_token = str(base64.decode(token))
    refused_token = raw_token.split(":")

    # if datetime.now() < datetime.strptime(refused_token[2], "%H:%M:%S"):

    con = db.conn()
    cursor = con.cursor()
    current_time = datetime.now()
    formatted_datetime = current_time.strftime('%Y-%m-%d %H:%M:%S')
    try:
        cursor.execute(
            f"delete from tokens where uuid= '{refused_token[0]}' and user_id = '{refused_token[1]}' and exp > '{formatted_datetime}' ")
        return True
    except Exception as e:
        logging.error(e)
        return False


def get_payload(token):
    return jwt.decode(token, algorithms="HS256", verify=True, key="secret")
