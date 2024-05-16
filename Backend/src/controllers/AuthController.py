from auth import AuthProvider
from auth import JwtService
from flask import Response, request


class AuthController():

    def authentication(self):
        return AuthProvider.try_auth()

    def login(self):
        return AuthProvider.login()

    def registry(self):
        return AuthProvider.registry()

    def all(self):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                if payload["role"] == "1":
                    return AuthProvider.all()
                else:
                    return Response('{"message":"access deny"}', 403, content_type="application/json")
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")

    def remove(self, code):
        try:
            if (AuthProvider.authenticate()):
                raw_id = request.headers.get("Authorization")[7:]
                payload = JwtService.get_payload(raw_id)
                if payload["role"] == "1":
                    return AuthProvider.remove(code)
                else:
                    return Response('{"message":"access deny"}', 403, content_type="application/json")
            else:
                return Response('{"message":"unauthorized"}', 401, content_type="application/json")
        except Exception as e:
            return Response('{"message":"failed"}', 500, content_type="application/json")
