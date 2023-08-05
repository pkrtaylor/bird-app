# here we make url endpoints to handle the views

from django.urls import path
from .views import Follow, RelationStatus, UnFollow, RelationsList
# when using class voews we add the as_view()
urlpatterns = [
    path('follow', Follow.as_view()),
    path('relationStatus', RelationStatus.as_view()),
    path('unfollow', UnFollow.as_view()),
    path('relationsList/<str:id>', RelationsList.as_view()),
    

]
