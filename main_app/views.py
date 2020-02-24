from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import ProfileForm
from .models import Profile, Favorites
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm

from django.shortcuts import render, redirect

def password_change(request):

    return render(request, 'password_change_form.html')


def detail_profile(request):
    user = User.objects.get(user=request.user)
    
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            profile.save()
            return render(request, 'detail_profile.html', {'form': form})
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'detail_profile.html', {'form': form})

        # return render(request)


def password_change_success(request):
    return render(request, 'password_change_success.html')

def index(request):
    return render(request, 'index.html', {})
    # return HttpResponse('<h1>Account Homepage!</h1>')

def intro(request):
    print('intro')
    return render(request, 'intro.html')

def create_profile(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('main_feed')
    else:
        form = ProfileForm()
        return render(request, 'profile_form.html', {'form':form})

# TODO add the redirect to the main_feed.html
def main_feed(request):
    return render(request, 'main_feed.html')

def feed_search(request):
    return render(request, 'feedsearch.html')


# I've added this to make sure a request directs to the detail_profile with the necessary elements:

def detail_profile(request):
    profile = Profile.objects.get(user=request.user)
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            profile.save()
            return render(request, 'detail_profile.html', {'form': form})
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'detail_profile.html', {'form': form})


def delete_profile(request):
    u = User.objects.get(pk=request.user.id)
    u.is_active = False
    u.save()

    return redirect('main_feed')

def logout(request):
    logout(request)
    return render(request, 'logout_success.html')


def logout_success(request):
        logout_success(request)
        return redirect('/')

def favorites(request):
    return render(request, 'favorites.html')
