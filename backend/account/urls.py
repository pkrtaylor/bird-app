# here we make url endpoints to handle the views

from django.urls import path
from .views import RegisterView, LoadUserView, CreateProfile, GetProfile, GetAllUsers
urlpatterns = [

    # the route will be 'api/account/register
    path('register', RegisterView.as_view()),
    # the route will be 'api/account/user
    path('user', LoadUserView.as_view()),
    path('profile', CreateProfile.as_view()),
    path('getProfile/<str:id>', GetProfile.as_view()),
    path('userList', GetAllUsers.as_view())

]
