import logging

from flask import request, Response
from auth import AuthService


def try_auth():
    try:
        raw_token = request.headers.get("Authorization")
        if raw_token is not None:
            token = raw_token[7:]
            return AuthService.validate_user(token)
        else:
            return Response('{"message":"unauthorized"}', 401, content_type="application/json")
    except Exception as e:
        logging.error(e)
        return Response('{"message":"unauthorized"}', 401, content_type="application/json")


def registry():
    try:
        return AuthService.registry()
    except Exception as e:
        return Response('{"message":"error"}', 500)


def login():
    try:
        return AuthService.login()
    except Exception as e:
        return Response('{"message":"error"}', 500)


def authenticate():
    try:
        raw_token = request.headers.get("Authorization")
        if raw_token is not None:
            token = raw_token[7:]
            return AuthService.authenticate(token)
        else:
            logging.error("1")
            return False
    except Exception as e:
        logging.error(e)
        return False
