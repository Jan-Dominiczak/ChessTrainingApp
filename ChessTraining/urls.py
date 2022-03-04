from nturl2path import url2pathname
from django.contrib.auth import views as auth_views
from django.urls import path, include
from .views import *

urlpatterns = [
    # path('validation', ChessGameView.as_view(), name="validation"),
    # path('', views.home, name='home'),
    path('', AjaxHandlerView.as_view()),
]