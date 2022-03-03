from nturl2path import url2pathname
from django.contrib.auth import views as auth_views
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.home, name='home'),
]