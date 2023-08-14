from rest_framework.views import APIView
# this allows us to send back reponses to next js
from rest_framework.response import Response
# this gives us permissions and status data
from rest_framework import permissions, status
# built in user model, normally we'd make our own
# from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from .models import User
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from django.db import Error


import datetime


class RegisterView(APIView):
    # lets set the permissions of this view
    # the default is authenticated
    # now we set to allow any

    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            # the json data comes in and we extract them
            data = request.data
            email = data['email']
            first_name = data['first_name']
            last_name = data['last_name']
            username = data['username']
            password = data['password']
            re_password = data['re_password']

            if password == re_password:
                if len(password) >= 8:
                    if not User.objects.filter(username=username).exists():
                        user = User.objects.create_user(
                            email=email,
                            first_name=first_name,
                            last_name=last_name,
                            username=username,
                            password=password,
                        )

                        user.save()
                        # check if user was created successfully

                        
                            
                        try:
                            if User.objects.filter(username=username).exists():
                                user_id = User.objects.filter(username=username).values('id')
                                #create default profile, so profile page can be displayed
                                
                                default_profile = Profile.objects.create(user_id_id=user_id)
                                default_profile.save()
                                
                                return Response(
                                {'success': 'Account created successfully'},
                                status=status.HTTP_201_CREATED
                            )
                        except Error as e:
                            return Response(
                                {'error': e.message},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                            )
                    
                    else:
                        return Response({'error': 'Username already exists'},
                                        status=status.HTTP_400_BAD_REQUEST
                                        )
                else:
                    return Response(
                        {'error': 'Password must length must be equal or greater than 8 characters'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': ' Passwords do no match'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
# now lets create a view that will load our user and end it back to next js

class LoadUserView(APIView):
    
    def get(self, request, format=None):
        try:
            # retrieve the user
            # we must serialize the data, so we in our accounts folder we create a serialzers.py file
            user = request.user
            # this serialzes our data so we can pass it back in a reponse
            user = UserSerializer(user)

            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {'error': 'Something went wrong when trying to load user data'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class GetAllUsers(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        try:
            profiles = Profile.objects.all()
            profiles = ProfileSerializer(profiles, many=True)
            #im going to do a join here on users and profile 
            # users = UserSerializer(users, many=True) had to remove this becasue whats returned is just list with string values in users, theres no need to serializer
            #users.data ketp coming out empty

            return Response({'profiles' : profiles.data},
                            status=status.HTTP_200_OK)
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




class CreateProfile(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        try:

            # remove values from request

            user_id = request.data['user_id']
            pfp = request.data['pfp']
            bgp = request.data['bgp']
            display_name = request.data['display_name']
            bio = request.data['bio']
            location = request.data['location']
            birthdate = request.data['birthdate']
            
            # get user object for foriegn key
            user = User.objects.filter(id=user_id).values('id')
            

            # get birthday and turn to date type
            birthdate = birthdate.split('-')
            d = datetime.date(int(birthdate[0]), int(
                birthdate[1]), int(birthdate[2]))
            
            if not Profile.objects.filter(user_id_id=user_id).exists():
                

                new_profile = Profile.objects.create(user_id_id=user,
                                                     pfp=pfp, bgp=bgp, display_name=display_name, bio=bio, location=location, birthdate=d)
                new_profile.save()

                new_profile = ProfileSerializer(new_profile, many=True)

                return Response(
                    {'profile': new_profile.data},
                    status=status.HTTP_200_OK
                )
            else:
                
                profile = Profile.objects.get(user_id_id=user_id)

                profile.pfp = pfp
                profile.bgp = bgp
                profile.display_name = display_name
                profile.bio = bio
                profile.location = location
                profile.birthdate = d

                profile.save()

                profile = ProfileSerializer(profile)

                return Response(
                    {'profile': profile.data},
                    status=status.HTTP_200_OK
                )

        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetProfile(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, **kwargs):

        

        username = self.kwargs['id']
        user_id = User.objects.get(username=username)
        
        #filter returns a queryset i cant use that as an exact look up in the filter after try 
        
        try:
            
            if Profile.objects.filter(user_id_id=user_id).exists():

                profile = Profile.objects.filter(
                    user_id_id=user_id)
                

                profile = ProfileSerializer(profile, many=True)

                
                return Response(
                    {'profile': profile.data},
                    status=status.HTTP_200_OK
                )
            else:
                Response(
                    {'error': 'Something went wrong'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
