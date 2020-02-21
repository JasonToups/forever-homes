from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth

# it's strange that when I delete this that the homepage stops working, but the httpResponse isn't connected to the homepage. Why is this?
def index(request):
    return HttpResponse('<h1>Homepage!</h1>')


    # return render(request, 'index')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            u = form.cleaned_data['username']
            p = form.cleaned_data['password1']
            user = authenticate(username = u, password = p)
            if user is not None:
                if user.is_active:
                    login(request, user)
            return redirect('intro')
        else:
            return render(request, 'register.html', {'form': form})
    else:
        form = UserCreationForm()
        return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            u = form.cleaned_data['username']
            p = form.cleaned_data['password']
            user = authenticate(username = u, password = p)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('main_feed')
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form':form})

def logout_view(request):
    auth.logout(request)
    return redirect('main_feed')




