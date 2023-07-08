from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Tweet
from account.serializers import UserSerializer


class TweetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = ('tweet_id', 'text', 'media', 'created_at',
                  'user_id', 'is_reply', 'code', 'parent_id')


class JoinSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()

    class Meta:
        model = Tweet
        fields = ('tweet_id', 'text', 'media', 'created_at',
                  'user_id', 'is_reply', 'code', 'parent_id')
