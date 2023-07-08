from rest_framework.views import APIView
# this allows us to send back reponses to next js
from rest_framework.response import Response
# this gives us permissions and status data
from rest_framework import permissions, status
# built in user model, normally we'd make our own
# from django.contrib.auth.models import User
from .models import Relations
from .serializer import RelationsSerializer

from django.http import HttpResponse
# Create your views here.


class Follow(APIView):

    serializer_class = RelationsSerializer

    def post(self, request):
        try:
            data = request.data
            follower = data['follower']
            followee = data['followee']
            print(1)
            if not Relations.objects.filter(follower=follower, followee=followee).exists():
                print(1.1)
                Relations.objects.create(
                    follower=follower,
                    followee=followee
                )

                if Relations.objects.filter(follower=follower, followee=followee).exists():
                    return Response(
                        {'success': 'Successfully followed user'},
                        status=status.HTTP_201_CREATED
                    )
                else:
                    return Response(
                        {'error': 'Somethigng went wrong with follow process'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            else:
                return Response(
                    {'error': 'Already follows user'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except:
            print(2)
            return Response(
                {'error': 'Something went wrong when trying to follow user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
