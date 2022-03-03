from django.shortcuts import render
from .pieces import collection
from django.http import HttpResponse

def home(request):
    response = HttpResponse("hello world")
    return render(request,'ChessTraining/home.html', {'collection': collection, 'test': response.content})
