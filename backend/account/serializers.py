from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User
from .models import Profile


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()

    class Meta:
        model = Profile
        fields = ('profile_id', 'user_id', 'pfp', 'bgp',
                  'display_name', 'bio', 'location', 'birthdate', 'created_at')
