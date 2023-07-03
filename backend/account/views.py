from rest_framework.views import APIView
# this allows us to send back reponses to next js
from rest_framework.response import Response
# this gives us permissions and status data
from rest_framework import permissions, status
# built in user model, normally we'd make our own
# from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from .models import User
from .serializers import UserSerializer


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

                        if User.objects.filter(username=username).exists():
                            return Response(
                                {'success': 'Account created successfully'},
                                status=status.HTTP_201_CREATED
                            )
                        else:
                            return Response(
                                {'error': 'Somethigng went wrong trying to create your account'},
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
        except:
            return Response(
                {'error': 'Something went wrong when trying to register user acccount'},
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
