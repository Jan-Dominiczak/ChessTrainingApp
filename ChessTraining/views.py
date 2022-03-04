from django.shortcuts import render
from .pieces import collection
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
import json

def home(request):
    text = request.GET.get()
    # print(request.POST('key1'))
    return render(request,'ChessTraining/home.html', {'collection': collection})


class AjaxHandlerView(View):
    
    def get(self, request):
        # test = "smth",
        # test2 = "smth else",
        if request.is_ajax():

            test = request.GET.get('curr')
            test2 = request.GET.get('move')
            piece = request.GET.get('piece')
            coords = {piece:[test, test2]}
            print(coords)
            return JsonResponse({'answer': coords}, status=200)

        return render(request, 'ChessTraining/home.html', {'collection': collection})