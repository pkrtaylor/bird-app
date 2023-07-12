from django.apps import AppConfig
import os
import json


class TweetsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tweets'

    # def ready(self):

    #     variables_keys = {
    #         "type": os.getenv("TYPE"),
    #         "project_id": os.getenv("PROJECT_ID"),
    #         "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    #         "private_key": os.getenv("PRIVATE_KEY"),
    #         "client_email": os.getenv("CLIENT_EMAIL"),
    #         "client_id": os.getenv("CLIENT_ID"),
    #         "auth_uri": os.getenv("AUTH_URI"),
    #         "token_uri": os.getenv("TOKEN_URI"),
    #         "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    #         "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
    #         "universe_domain": "googleapis.com"
    #     }

    #     json_object = json.dumps(variables_keys, indent=4)
    #     with open('creds.json', 'w', encoding='utf8') as f:
    #         f.write(json_object)

    # with open('creds.json', 'r', newline='') as rf:
    #     content = rf.read()
    # print(content)
    # content = content.replace("\\", "'\'")
    # print(content)
    # with open('testnew.json', 'w', newline='') as wf:
    #     wf.write(content)
