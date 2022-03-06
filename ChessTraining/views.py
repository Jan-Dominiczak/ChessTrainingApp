from django.shortcuts import render
from .pieces import collection, calculatePosition, cleanChessboard
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
import json


class AjaxHandlerView(View):
    
    def get(self, request):
        if request.is_ajax():
            piece = request.GET.get('piece')
            if piece == 'clean':                                            # jeśli wysłano żądanie wyczyszczenia szachownicy
                cleanChessboard()
                return JsonResponse({'answer': "Chessboard cleaned"}, status=200)
            current = request.GET.get('curr')                                  # jeśli wysłano zapytanie o walidację ruchu
            destination = request.GET.get('move')
            coords = {"name": piece, "move":[current, destination]}
            answer = calculatePosition(coords)
            return JsonResponse({'answer': answer}, status=200)
        return render(request, 'ChessTraining/home.html', {'collection': collection})
