import json
import logging
import uuid
from typing import Any, List

import psycopg
from db.DatabaseConnect import DatabaseConnect
from flask import Response, request
from psycopg.rows import class_row
from models.Models import Category

class CategoryService():
    def all_category(self):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        cursor.execute("SELECT * FROM category")
        result: List[Category] = []
        raw = cursor.fetchall()
        for elem in raw:
            data = Category(elem[0], elem[1])
            result.append(data)
        resp = json.dumps(result, default=vars)
        return Response(response=resp, status=200, mimetype="application/json")


    def create_category(self):
        req = request.data
        request_data = json.loads(req)
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor()
        query = "INSERT INTO category (uuid, title) VALUES (%s, %s)"
        cuid = uuid.uuid4()
        cursor.execute(query, (
            cuid, request_data['title']))
        con.commit()
        cursor.close()
        con.close()
        request_data["uuid"] = str(cuid)
        res = json.dumps(request_data)
        return Response(response=res, status=200, mimetype="application/json")


    def update_category(self):
        req = request.data
        request_data = json.loads(req)
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor(row_factory=class_row(Category))
        cursor.execute(
            f"update category set title = '{request_data['title']}'")
        con.commit()
        return Response(response='{"message":"updated"}', status=200, mimetype="application/json")


    def delete_category(self,code):
        db = DatabaseConnect()
        con: psycopg.Connection[tuple[Any, ...]] = db.conn()
        cursor: psycopg.Cursor[tuple[Any, ...]] = con.cursor(row_factory=class_row(Category))
        cursor.execute(f"delete from category where uuid = '{code}'")
        con.commit()
        return Response(response='{"message":"delete"}', status=200, mimetype="application/json")