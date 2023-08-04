from rest_framework.views import APIView
# this allows us to send back reponses to next js
from rest_framework.response import Response
# this gives us permissions and status data
from rest_framework import permissions, status
# built in user model, normally we'd make our own
# from django.contrib.auth.models import User
from .models import Relations
from .serializer import RelationsSerializer, FolloweesSerializer, FollowingSerializer
from django.db import Error

from django.http import HttpResponse
# Create your views here.


class Follow(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RelationsSerializer

    def post(self, request):
        try:
            data = request.data
            follower = data['follower']
            followee = data['followee']
            print(followee)
            print(follower)
            if not Relations.objects.filter(follower=follower, followee=followee).exists():
                print(1.1)
                follow_process = Relations.objects.create(
                    follower=follower,
                    followee=followee
                )

                follow_process.save()

                if Relations.objects.filter(follower=follower, followee=followee).exists():
                    print(2)
                    relation = Relations.objects.filter(follower=follower, followee=followee)
                    print(2.1)

                    relation = RelationsSerializer(relation, many=True)

                    return Response(
                        {'relation': relation.data},
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

        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        
    def delete(self, request):
        try:
            data = request.data
            un_follower = data['follower']
            un_followee = data['followee']

            if Relations.objects.filter(follower=un_follower, followee=un_followee).exists():
                remove_relation = Relations.objects.filter(follower=un_follower, followee=un_followee).delete()

                return Response({'relation' : remove_relation},status=status.HTTP_200_OK)
            else:
                return Response({'error' : 'not following user'},status=status.HTTP_400_BAD_REQUEST )
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class UnFollow(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data
            un_follower = data['follower']
            un_followee = data['followee']

            if Relations.objects.filter(follower=un_follower, followee=un_followee).exists():
                remove_relation = Relations.objects.filter(follower=un_follower, followee=un_followee).delete()

                return Response({'relation' : remove_relation},status=status.HTTP_200_OK)
            else:
                return Response({'error' : 'not following user'},status=status.HTTP_400_BAD_REQUEST )
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        
class RelationStatus(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data
            follower = data['follower']
            followee = data['followee']

            if Relations.objects.filter(follower=follower, followee=followee).exists() or Relations.objects.filter(follower=followee, followee=follower).exists():
                relationStatus = []
                #if current user follows user
                if  Relations.objects.filter(follower=follower, followee=followee).exists():
                    relation1 = Relations.objects.filter(follower=follower, followee=followee)
                    relation1 = RelationsSerializer(relation1, many=True)
                    relationStatus.append(relation1.data)
                else:
                    relationStatus.append([])
               #if current user is followed by user
                if Relations.objects.filter(follower=followee, followee=follower).exists():
                    relation2 = Relations.objects.filter(follower=followee, followee=follower)
                    relation2 = RelationsSerializer(relation2, many=True)
                    relationStatus.append(relation2.data)
                else:
                    relationStatus.append([])
                return Response(
                    {'relationStatus': relationStatus},
                    status=status.HTTP_201_CREATED
                )
            else:
                  return Response(
                    {'relationStatus': []},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class RelationsList(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, **kwargs):
        username = self.kwargs['id']

        try:
            print(username)
            relationsList = {}
            print(1)
            if Relations.objects.filter(follower=username).exists():
                print(1.1)
                following = Relations.objects.filter(follower=username).values_list('followee', flat=True)
                print(1.2)
                print(following)
                # following = FollowingSerializer(following, many=True)
                print(1.3)
                
                print(1.4)
                relationsList['following'] = following
                print('1.4.1')
                print(relationsList)
            else:
                relationsList['following'] = []
            
            if Relations.objects.filter(followee=username).exists():
                print(1.5)
                followees = Relations.objects.filter(followee=username).values_list('follower', flat=True)
                print(1.6)
                # followees = FolloweesSerializer(followees, many=True)
                print(1.7)
                relationsList['followers'] = followees
            else:
                relationsList['followers'] = []



            return Response({'relationsList': relationsList}, status=status.HTTP_200_OK)
        
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )








# class UnFollow(APIView):
#     def delete(self, request):
#         try:
#             data = request.data
#             un_follower = data['follower']
#             un_followee = data['followee']

#             if Relations.objects.filter(follower=un_follower, followee=un_followee).exists():
#                 remove_relation = Relations.objects.filter(follower=un_follower, followee=un_followee).delete()

#                 return Response({'relation' : remove_relation},status=status.HTTP_200_OK)
#             else:
#                 return Response({'error' : 'not following user'},status=status.HTTP_400_BAD_REQUEST )




#         except Error as e:
#             return Response(
#                 {'error': e.message},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )



