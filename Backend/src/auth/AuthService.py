import json
import logging
import uuid
from datetime import datetime
from typing import Any

import psycopg
from db.DatabaseConnect import DatabaseConnect
from flask import Response, request
from auth import JwtService
from models.Models import TokenModel, User, TokenResponse


def validate_user(token):
    try:
        payload = JwtService.get_payload(token)
        db = DatabaseConnect()
        con = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        cursor.execute(f"select * from users where uuid = '{payload['uuid']}'")
        value: User = cursor.fetchall()
        con.close()
        user = value[0]
        if user[0] == payload["uuid"]:
            user = TokenModel(user[0], user[1], user[3], user[4], user[5])
            access_token = JwtService.gen_access_token(user)
            refresh_token = JwtService.gen_refresh_token(user.uuid)
            raw_response = TokenResponse(access_token, refresh_token)
            logging.error(raw_response)
            response = raw_response.toJSON()
            return Response(response, 200, content_type="application/json")
        else:
            return Response('{"message":"unauthorized0"}', 401, content_type="application/json")
    except Exception as e:
        logging.error(e)
        return Response('{"message":"unauthorized1"}', 401, content_type="application/json")


def registry():
    try:
        raw_data = request.data
        data = json.loads(raw_data)
        db = DatabaseConnect()
        conn = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = conn.cursor()
        cuid = uuid.uuid4()
        cursor.execute(
            f"insert into users (uuid, name, password, email, role, is_active) VALUES ('{cuid}','{data['name']}','{data['password']}','{data['email']}', '0', 1)")
        conn.commit()
        return Response('{"message":"ok"}', 200, content_type="application/json")
    except Exception as e:
        return Response('{"message":"error"}', 500, content_type="application/json")


def login():
    try:
        raw_data = request.data
        data = json.loads(raw_data)
        db = DatabaseConnect()
        conn = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = conn.cursor()
        cursor.execute(f"select * from users where name = '{data['name']}'")
        values = cursor.fetchall()
        user = values[0]
        if user[2] == data["password"]:
            user = TokenModel(user[0], user[1], user[3], user[4], user[5])
            access_token = JwtService.gen_access_token(user)
            refresh_token = JwtService.gen_refresh_token(user.uuid)
            raw_response = TokenResponse(access_token, refresh_token)
            logging.error(raw_response)
            response = raw_response.toJSON()
            return Response(response, 200, content_type="application/json")
        else:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    except Exception as e:
        return Response('{"message":"failed"}', 500, content_type="application/json")


def authenticate(token):
    try:
        payload = JwtService.get_payload(token)
        db = DatabaseConnect()
        con = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        cursor.execute(f"select * from users where uuid = '{payload['uuid']}'")
        value: User = cursor.fetchall()
        con.close()
        user = value[0]
        if user[0] == payload["uuid"] and int(datetime.now().timestamp()) < payload['exp']:
            return True
        else:
            logging.error("0")
            return False
    except Exception as e:
        logging.error(e)
        return False


def all():
    try:
        db = DatabaseConnect()
        conn = db.conn()
        cursor = conn.cursor()
        cursor.execute("select name,email,role,uuid from users")
        raw_data = cursor.fetchall()
        result = []
        for elem in raw_data:
            obj = {
                "name": elem[0],
                "email": elem[1],
                "role": elem[2],
                "uuid": elem[3]
            }
            result.append(obj)
        return Response(json.dumps(result), 200, content_type="application/json")
    except Exception as e:
        return Response('{"message":"error"}', 500)


def remove(code):
    try:
        db = DatabaseConnect()
        conn = db.conn()
        cursor = conn.cursor()
        cursor.execute(f"delete from users where uuid ='{code}'")
        conn.commit()
        return Response('{"message":"ok"}', 200, content_type="application/json")
    except Exception as e:
        return Response('{"message":"error"}', 500, content_type="application/json")
