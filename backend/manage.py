#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import json


def main():
    """Run administrative tasks."""

    os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                          'bird_app_backend.settings')

    # variables_keys = {
    #     "type": os.getenv("TYPE"),
    #     "project_id": os.getenv("PROJECT_ID"),
    #     "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    #     "private_key": os.getenv("PRIVATE_KEY"),
    #     "client_email": os.getenv("CLIENT_EMAIL"),
    #     "client_id": os.getenv("CLIENT_ID"),
    #     "auth_uri": os.getenv("AUTH_URI"),
    #     "token_uri": os.getenv("TOKEN_URI"),
    #     "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    #     "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
    #     "universe_domain": "googleapis.com"
    # }
    # json_object = json.dumps(variables_keys, indent=4)

    # with open("creds.json", "w") as outfile:
    #     outfile.write(json_object)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)


if __name__ == '__main__':

    main()
