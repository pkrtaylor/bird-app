from rest_framework.views import APIView
# this allows us to send back reponses to next js
from rest_framework.response import Response
# this gives us permissions and status data
from rest_framework import permissions, status, serializers
# built in user model, normally we'd make our own
# from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from django.core.cache import cache
from .models import Tweet
from .serializer import TweetSerializer, JoinSerializer
from account.serializers import UserSerializer
from account.models import User
from relationship.models import Relations
from django.http import HttpResponse
from relationship.serializer import RelationsSerializer
from django_redis import get_redis_connection
import ast
import redis
from django.db import Error
from django.db.models import F, CharField, Value


# Create your views here.


# request.FILES contains any files that have been uploaded with the post request

# redis_cache = caches['default']
# redis_client = redis_cache.client.get_client()


class SendTweet(APIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):

        # print(request.data)

        # return Response(
        #     {'tweets': []},
        #     status=status.HTTP_200_OK
        # )
        try:

            media = request.data['media']
            text = request.data['text']
            user_id = request.data['user_id']
            is_reply = request.data['is_reply']
            parent_id = request.data['parent_id']
            print(media)
            print(text)
            print(user_id)
            print(is_reply)
            print(parent_id)
            # print(text)
            user = User.objects.filter(id=user_id).values('id')
            print(1)

            if is_reply == 'True':
                print(2)
                parent = Tweet.objects.get(tweet_id=parent_id)
                print(3)
                new_tweet = Tweet.objects.create(
                    text=text, media=media, user_id_id=user, parent=parent, is_reply=True, code='1')
                print(4)
                new_tweet.save()

            else:
                new_tweet = Tweet.objects.create(
                    text=text, media=media, user_id_id=user)
                new_tweet.save()

            # reminder code has to be different each time since it is a unique type
            # new_tweet['code'] = str(new_tweet['tweet_id']).replace("-", "")
            # new_tweet.save()
            # print(new_tweet.pk)
            # print(new_tweet['tweet_id'])
            # we can still access that new tweet object within the variable to get media link from aws3
            print(5)
            new_tweet = TweetSerializer(new_tweet).data
            print(6)
            tweet_id = str(new_tweet['tweet_id']).replace("-", "")

            update = Tweet.objects.get(tweet_id=new_tweet['tweet_id'])
            update.code = tweet_id
            update.save()
            media_link = new_tweet['media']
            print(7)

            created_at = new_tweet['created_at']
            user = user.values()
            # create redis key
            username = user[0]['username']
            redisKey = "HomeTL:" + username
           # print(redisKey)

            # create redis tweet object and stringify
            if is_reply == 'True':
                redisTweetObject = {
                    'tweet_id': tweet_id,
                    'username': username,
                    'text': text,
                    'media': media_link,
                    'created_at': created_at,
                    'is_reply': is_reply

                }
            else:
                redisTweetObject = {
                    'tweet_id': tweet_id,
                    'username': username,
                    'text': text,
                    'media': media_link,
                    'created_at': created_at,

                }

            redisTweetObjectString = str(redisTweetObject)

            redisClient = redis.StrictRedis(
                host="localhost", port=6379, charset="utf-8", decode_responses=True)

            redisClient.lpush(redisKey, redisTweetObjectString)

            # if tweet key exists we just add to list in redis
            # con = get_redis_connection("default")
            # print(con)
            # con.lpush(redisKey, redisTweetObjectString)
            # con.flushall()
            # get list of followers
            # at first i used values() which returns dicts with column name and value
            # values_list() returns tuples with just the value in it
            # adding flat = True will return the results as single values
            if is_reply == 'False':
                followers = Relations.objects.filter(
                    followee=username).values_list('follower', flat=True)
                print(followers)
                pipe = redisClient.pipeline()
                for i in range(0, len(followers)):
                    redisKey2 = "HomeTL:" + followers[i]
                    print(redisKey2)
                    pipe.lpush(redisKey2, redisTweetObjectString)

                pipe.execute()

            # if (con.lrange('HomeTL:piratehunter', 0, -1)):
            #     print(con.lrange('HomeTL:piratehunter', 0, -1))
            # else:
            #     print('fail')
            data = redisClient.lrange(redisKey, 0, -1)
            redisClient.close()
            print(2.5)
            unstring_data = []
            for x in data:
                unstring_data.append(ast.literal_eval(x))

            # print(unstring_data)
            # print(ast.literal_eval(data[0]))

            # then we add tweet to all users cache
            # maybe create a function that add tweets to cache
            return Response(
                {'tweets': unstring_data},
                status=status.HTTP_200_OK
            )
        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RetrieveTweet(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, **kwargs,):

        tweet_id = self.kwargs['id']

        try:
            if Tweet.objects.filter(tweet_id=tweet_id).exists():

                tweet = Tweet.objects.filter(tweet_id=tweet_id)

                # many=True places it in list form
                tweet = TweetSerializer(tweet, many=True)

                return Response(
                    {'tweet': tweet.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'no tweets found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except:
            return Response(
                {'error': 'something went wrong retrieving tweets'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RetrieveReplies(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, **kwargs,):

        tweet_id = self.kwargs['id']

        try:
            if Tweet.objects.filter(tweet_id=tweet_id).exists():

                replies = Tweet.objects.filter(
                    parent_id=tweet_id).select_related('user_id')
                # raw(f"SELECT tweets_tweet.tweet_id, tweets_tweet.text, tweets_tweet.media, tweets_tweet.user_id_id, tweets_tweet.created_at, tweets_tweet.is_reply,tweets_tweet.parent_id, tweets_tweet.code, tweets_tweet.path, account_user.username AS username, account_user.password, account_user.id, account_user.email, account_user.username, account_user.first_name, account_user.last_name, account_user.is_active, account_user.is_superuser, account_user.is_staff, account_user.date_joined, account_user.last_login, account_user.created_at, account_user.updated_at FROM tweets_tweet INNER JOIN account_user ON (tweets_tweet.user_id_id = account_user.id) WHERE tweets_tweet.parent_id = '{tweet_id}';")
                # .annotate(username=F('User__username'))

                # i want to join by user_id of tweet table and id of user table

                # many=True places it in list form
                replies = JoinSerializer(replies, many=True)

                return Response(
                    {'replies': replies.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'no tweets found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Error as e:
            return Response(
                {'error': e.message},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RetrieveHomeTL(APIView):

    def get(self, request):
        try:
            user = request.user
            user = UserSerializer(user).data
            if user:

                homeTL_key = "HomeTL:" + user['username']
                redisClient = redis.StrictRedis(
                    host="localhost", port=6379, charset="utf-8", decode_responses=True)

                data = redisClient.lrange(homeTL_key, 0, -1)

                redisClient.close()
                home_tl = []
                for x in data:
                    home_tl.append(ast.literal_eval(x))

                print(home_tl)

                return Response(
                    {'tweets': home_tl},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'no tweets found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except:
            return Response(
                {'error': 'something went wrong retrieving tweets'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class FlushRedis(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        redisClient = redis.StrictRedis(
            host="localhost", port=6379, charset="utf-8", decode_responses=True)
        redisClient.flushall()
        redisClient.close()
        return Response(
            {'message': 'tweets flushed'},
            status=status.HTTP_200_OK
        )
