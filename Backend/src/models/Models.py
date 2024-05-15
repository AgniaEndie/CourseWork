import json
import string
from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class Product:
    uuid: string
    title: string
    about: string
    price: float
    amount: int
    category: string


@dataclass
class Category:
    uuid: string
    title: string


@dataclass
class User:
    uuid: string
    name: string
    password: string
    email: string
    role: string
    is_active: int


class TokenModel:
    uuid: string
    name: string
    email: string
    role: string
    is_active: int
    exp: int

    def __init__(self, uuid, name, email, role, is_active):
        self.uuid = uuid
        self.name = name
        self.email = email
        self.role = role
        self.is_active = is_active

    def toJSON(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__,
            sort_keys=True,
            indent=4)


class TokenResponse:
    access_token: string
    refresh_token: string

    def __init__(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token

    def toJSON(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__,
            sort_keys=True,
            indent=4)


@dataclass
class Cart:
    uuid: string
    user_id: string
    product_id: string
    count: int

    def to_dict(self):
        return {
            'uuid': self.uuid,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'count': self.count
        }
