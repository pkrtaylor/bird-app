# here we make url endpoints to handle the views

from django.urls import path
from .views import Follow
# when using class voews we add the as_view()
urlpatterns = [
    path('follow', Follow.as_view()),
]
