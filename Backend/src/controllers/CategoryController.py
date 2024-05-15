from services.CategoryService import CategoryService

class CategoryController():
    categoryService = CategoryService()

    def all_category(self):
        return self.categoryService.all_category()

    def create_category(self):
        return self.categoryService.create_category()

    def update_category(self):
        return self.categoryService.update_category()

    def delete_category(self,code):
        return self.categoryService.delete_category(str(code))