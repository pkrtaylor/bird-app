from django.apps import AppConfig


class CredentialScript(AppConfig):

    def ready(self):
        print('I have run before app startup')
