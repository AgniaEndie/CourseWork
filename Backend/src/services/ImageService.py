from flask import Response, send_file, request


class ImageService:
    def get_image(self, code):
        path = f"/var/lib/eshop/storage/{code}.png"
        return send_file(path, mimetype='image/png')

    def upload_image(self):
        if 'file' not in request.files:
            return Response('{"message":"No file uploaded"}', 400, content_type="application/json")
        data = dict(request.form)
        file = request.files['file']
        file.save(f'/var/lib/eshop/storage/{data["code"]}.png')
        return Response('{"message":"ok"}', 200, content_type="application/json")
