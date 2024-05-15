import logging

from flask import Response, request
from services.CartService import CartService
from auth import AuthProvider, JwtService


class CartController:
    def add_to_cart(self):
        try:
            if (AuthProvider.authenticate()):
                cartService = CartService()
                return cartService.add_to_cart()
            else:
                return Response('{"message":"unauthorized1"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def remove_one_product_from_cart(self, code):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                cartService = CartService()
                return cartService.remove_one_product_from_cart(code, payload['uuid'])
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def clear_cart(self):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                cartService = CartService()
                return cartService.clear_cart(payload["uuid"])
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def transfer_cart_to_orders(self):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                cartService = CartService()
                return cartService.transfer_cart_to_orders(payload["uuid"])
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def get_cart(self):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                cartService = CartService()
                return cartService.get_cart(payload["uuid"])
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            logging.error(e)
            return Response('{"message":"failed"}', 500, content_type="application/json")
    def update_cart(self):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                cartService = CartService()
                return cartService.update_cart(payload["uuid"])
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            logging.error(e)
            return Response('{"message":"failed"}', 500, content_type="application/json")