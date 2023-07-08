# here we make url endpoints to handle the views

from django.urls import path
from .views import RegisterView, LoadUserView

urlpatterns = [

    # the route will be 'api/account/register
    path('register', RegisterView.as_view()),
    # the route will be 'api/account/user
    path('user', LoadUserView.as_view()),

]
