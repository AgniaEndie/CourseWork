from services.ImageService import ImageService


class ImageController:
    imageService = ImageService()

    def get_image(self, code):
        return self.imageService.get_image(code)

    def upload_image(self):
        return self.imageService.upload_image()
