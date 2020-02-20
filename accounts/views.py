from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm

def index(request):
    return HttpResponse('<h1>Accounts Homepage!</h1>')

def register(request):
        form = UserCreationForm()
        return render(request, 'register.html', {'form':form})
