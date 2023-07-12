from django.apps import AppConfig
import os
import json


class TweetsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tweets'
