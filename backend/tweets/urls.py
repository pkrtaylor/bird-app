# here we make url endpoints to handle the views

from django.urls import path
from .views import SendTweet, RetrieveTweet, RetrieveHomeTL, FlushRedis, RetrieveReplies
# when using class voews we add the as_view()
urlpatterns = [
    path('tweet', SendTweet.as_view()),
    path('retrieveTweet/<str:id>', RetrieveTweet.as_view()),
    path('homeTimeLine', RetrieveHomeTL.as_view()),
    path('retrieveReplies/<str:id>', RetrieveReplies.as_view()),
    path('flush-redis', FlushRedis.as_view())
]


# retrieveTweet/<str:id>
# r'^retrieveTweet/(?P<id>\d+)/$'
