import json

from flask import request, Response
from services.ProductService import ProductService



class ProductController():
    productService = ProductService()

    def all_products(self, productService=productService):
        data = productService.getAllProduct()
        return data

    def get_product(self,code):
        data = self.productService.get_product(str(code))
        return data

    def create_product(self):
        data = self.productService.create_product()
        return data

    def update_product(self):
        data = self.productService.update_product()
        return data
    def delete_product(self,code):
        return self.productService.delete_product(str(code))
    def product_by_category(self,code):
        return self.productService.product_by_category(str(code))