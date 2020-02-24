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
from django.contrib import messages
from django.contrib.auth.decorators import login_required

# it's strange that when I delete this that the homepage stops working, but the httpResponse isn't connected to the homepage. Why is this?
def index(request):
    return HttpResponse('<h1>Homepage!</h1>')


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
            return redirect('intro')
        else:
            return render(request, 'register.html', {'form': form})
    else:
        form = UserCreationForm()
        return render(request, 'register.html', {'form': form})

@login_required
def change_password(request):

    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('main_feed')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user, request.POST)
    return render(request, 'password_change_form.html', {
        'form': form
    })

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

@login_required
def delete_profile(self):
    self.objects.get(id=pk).delete()
    return redirect('logout_success')
