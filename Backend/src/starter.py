from flask import Flask
from controllers.ProductController import ProductController
from controllers.CategoryController import CategoryController
from controllers.AuthController import AuthController
from controllers.CartController import CartController
from controllers.ImageController import ImageController

app = Flask(__name__)

productController = ProductController()
app.add_url_rule('/product/all', view_func=productController.all_products, methods=["GET"])
app.add_url_rule('/products/<code>', view_func=productController.product_by_category, methods=["GET"])
# app.add_url_rule('/product', view_func=productController.get_product)
app.add_url_rule('/product/<code>', view_func=productController.get_product, methods=["GET"])
app.add_url_rule('/product/create', view_func=productController.create_product, methods=["POST"])
app.add_url_rule('/product/update', view_func=productController.update_product, methods=["PUT"])
app.add_url_rule('/product/delete/<code>', view_func=productController.delete_product, methods=["DELETE"])

categoryController = CategoryController()
app.add_url_rule('/category/all', view_func=categoryController.all_category, methods=["GET"])
app.add_url_rule('/category/create', view_func=categoryController.create_category, methods=["POST"])
app.add_url_rule('/category/update', view_func=categoryController.update_category, methods=["PUT"])
app.add_url_rule('/category/delete/<code>', view_func=categoryController.delete_category, methods=["DELETE"])

authController = AuthController()
app.add_url_rule('/auth/authentication', view_func=authController.authentication, methods=["GET"])
app.add_url_rule('/auth/registry', view_func=authController.registry, methods=["POST"])
app.add_url_rule('/auth/login', view_func=authController.login, methods=["POST"])
app.add_url_rule('/users/all', view_func=authController.all, methods=["GET"])
app.add_url_rule('/users/remove/<code>', view_func=authController.remove, methods=["DELETE"])

cartController = CartController()
app.add_url_rule('/cart/add', view_func=cartController.add_to_cart, methods=["POST"])
app.add_url_rule('/cart/remove/<code>', view_func=cartController.remove_one_product_from_cart, methods=["DELETE"])
app.add_url_rule('/cart/clear', view_func=cartController.clear_cart, methods=["DELETE"])
app.add_url_rule('/cart/transfer', view_func=cartController.transfer_cart_to_orders, methods=["GET"])
app.add_url_rule('/cart', view_func=cartController.get_cart, methods=["GET"])
app.add_url_rule('/cart/update',view_func=cartController.update_cart, methods=["PUT"])


imageController = ImageController()
app.add_url_rule('/image/<code>', view_func=imageController.get_image, methods=["GET"])
app.add_url_rule('/image/upload', view_func=imageController.upload_image, methods=["POST"])


@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Methods'] = '*'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Vary'] = 'Origin'
    return response


app.run(host='0.0.0.0', port=5000, debug=True)
