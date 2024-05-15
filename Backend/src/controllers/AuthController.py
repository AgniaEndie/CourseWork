from auth import AuthProvider
class AuthController():

    def authentication(self):
        return AuthProvider.try_auth()

    def login(self):
        return AuthProvider.login()

    def registry(self):
        return AuthProvider.registry()