from rest_framework import serializers
from .models import Relations


class RelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relations
        fields = ('follower', 'followee')
