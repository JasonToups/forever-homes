from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import auth
from main_app.models import Profile
from main_app.views import detail_profile
from main_app.views import password_change
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User


# it's strange that when I delete this that the homepage stops working, but the httpResponse isn't connected to the homepage. Why is this?
def index(request):
    return HttpResponse('<h1>Homepage!</h1>')

def password_change(request):
    u = User.objects.get(username='john')
    u.set_password('new password')
    u.save()

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            u = form.cleaned_data['username']
            p = form.cleaned_data['password1']
            user = authenticate(username = u, password = p)
            if user is not None:
                login(request, user)
                Profile.objects.create(user=user)
            return redirect('detail_profile')
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
            if user is not None and user.is_active:
                login(request, user)
                return redirect('main_feed')
            else:
                return render(request, 'login.html', {'form':form, 'error':'account deactivated'})
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form':form})

def logout_view(request):
    auth.logout(request)
    return redirect('main_feed')

def delete_profile(self):
    self.objects.get(id=pk).delete()
    return redirect('logout_success')

