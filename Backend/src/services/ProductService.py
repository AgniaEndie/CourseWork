import json
import logging
import uuid
from typing import Any, List

import psycopg
from db.DatabaseConnect import DatabaseConnect
from flask import Response, request
from psycopg.rows import class_row
from models.Models import Product


class ProductService():

    def getAllProduct(self):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        cursor.execute("SELECT * FROM product")
        result: List[Product] = []
        raw = cursor.fetchall()
        for elem in raw:
            data = Product(elem[0], elem[1], elem[2], elem[3], elem[4], elem[5])
            result.append(data)
        resp = json.dumps(result, default=vars)
        return Response(response=resp, status=200, mimetype="application/json")

    def get_product(self, code):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor(row_factory=class_row(Product))
        cursor.execute(f"SELECT * FROM product WHERE uuid='{code}'")
        raw: Product = cursor.fetchall()
        logging.warning(f" {len(raw)}")
        resp = json.dumps(raw[0], default=vars)
        return Response(response=resp, status=200, mimetype="application/json")

    def create_product(self):
        req = request.data
        request_data = json.loads(req)
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        query = "INSERT INTO product (uuid, title, about, price, amount, category) VALUES (%s, %s, %s, %s, %s, %s)"
        cuid = uuid.uuid4()
        cursor.execute(query, (
            cuid, request_data['title'], request_data['about'], request_data['price'], request_data['amount'],
            request_data['category']))
        con.commit()
        cursor.close()
        con.close()
        # '{"message":"created"}'
        request_data["uuid"] = str(cuid)
        res = json.dumps(request_data)
        return Response(response=res, status=200, mimetype="application/json")

    def update_product(self):
        req = request.data
        request_data = json.loads(req)
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor(row_factory=class_row(Product))
        cursor.execute(
            f"update product set title = '{request_data['title']}', about = '{request_data['about']}', price ='{request_data['price']}', amount='{request_data['amount']}', category='{request_data['category']}' where uuid = '{request_data['uuid']}'")
        con.commit()
        return Response(response='{"message":"updated"}', status=200, mimetype="application/json")
    def delete_product(self,code):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor(row_factory=class_row(Product))
        cursor.execute(f"delete from product where uuid = '{code}'")
        con.commit()
        return Response(response='{"message":"delete"}', status=200, mimetype="application/json")

    def product_by_category(self, code):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        cursor.execute(f"SELECT * FROM product where category = '{code}'")
        result: List[Product] = []
        raw = cursor.fetchall()
        for elem in raw:
            data = Product(elem[0], elem[1], elem[2], elem[3], elem[4], elem[5])
            result.append(data)
        resp = json.dumps(result, default=vars)
        return Response(response=resp, status=200, mimetype="application/json")