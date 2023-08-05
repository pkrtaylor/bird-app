from rest_framework import serializers
from .models import Relations


class RelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relations
        fields = ('follower', 'followee')
class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relations
        fields = ['followee']

class FolloweesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relations
        fields = ['follower']
