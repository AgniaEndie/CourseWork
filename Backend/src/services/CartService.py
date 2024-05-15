import json
import logging
import uuid
from typing import Any

import psycopg
from flask import Response, request
from db.DatabaseConnect import DatabaseConnect
from models.Models import Cart


class CartService:
    def add_to_cart(self):
        try:
            raw_data = request.data
            data = json.loads(raw_data)
            db = DatabaseConnect()
            con: psycopg.Connection[tuple[Any, ...]] = db.conn()
            cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
            cuid = uuid.uuid4()
            cursor.execute(
                f"insert into cart (uuid, user_id,product_id,count) values ('{cuid}','{data['user_id']}','{data['product_id']}','{data['count']}')")
            con.commit()
            return Response('{"message":"created"}', 201, content_type="application/json")
        except Exception as e:

            return Response('{"message":"failed"}', 500, content_type="application/json")

    def remove_one_product_from_cart(self, code, user_id):
        try:
            logging.error(code)
            db = DatabaseConnect()
            con = db.conn()
            cursor = con.cursor()
            query = f"DELETE FROM cart WHERE user_id = '{user_id}' and product_id='{code}'"
            cursor.execute(query)
            con.commit()
            cursor.close()
            con.close()
            return Response('{"message":"removed"}', 200, content_type="application/json")
        except Exception as e:
            logging.error(e)
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def clear_cart(self, user_id):
        try:
            db = DatabaseConnect()
            con: psycopg.Connection[tuple[Any, ...]] = db.conn()
            cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
            cursor.execute(f"delete from cart where user_id = '{user_id}'")
            con.commit()
            return Response('{"message":"removed"}', 200, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def transfer_cart_to_orders(self, user_id):
        pass

    def get_cart(self, user_id):
        try:
            db = DatabaseConnect()
            conn = db.conn()
            cursor = conn.cursor()
            cursor.execute(f"select * from cart where user_id = '{user_id}'")
            raw_data = cursor.fetchall()
            result = []
            for elem in raw_data:
                cart = Cart(elem[0], elem[1], elem[2], elem[3])
                if(cart.count == 0):
                    cursor2 = conn.cursor()
                    cursor2.execute(f"delete from cart where user_id='{user_id}' and product_id = '{cart.product_id}'")
                    conn.commit()
                    cursor2.close()
                cart_dict = cart.to_dict()
                result.append(cart_dict)

            response = json.dumps(result)
            return Response(response, 200, content_type="application/json")

        except Exception as e:
            logging.error(e)
            return Response('[]', 500, content_type="application/json")

    def update_cart(self,user_id):
        try:
            raw_data = request.data
            data = json.loads(raw_data)
            db = DatabaseConnect()
            con: psycopg.Connection[tuple[Any, ...]] = db.conn()
            cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()

            cursor.execute(
                f"update cart set count = '{data['count']}' where user_id = '{user_id}' and uuid='{data['uuid']}'")
            con.commit()
            return Response('{"message":"updated"}', 201, content_type="application/json")
        except Exception as e:
            logging.error(e)
            return Response('{"message":"failed"}', 500, content_type="application/json")
