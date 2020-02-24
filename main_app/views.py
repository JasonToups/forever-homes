from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .forms import ProfileForm
from .models import Profile, Favorites, Search
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from django.core import serializers
from django.contrib.auth.decorators import login_required

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
    if request.method == 'POST':
            searchUser = request.user
            type = request.POST['type1']
            coat = request.POST.get('type2', False)
            color = request.POST['type3']
            gender = request.POST['type4']
            searchFields = Search(user=searchUser, type=type, coat=coat, color=color, gender=gender)
            searchFields.save()
            return redirect('main_feed')
    return render(request, 'feedsearch.html')


# credit to https: // dev-yakuza.github.io/en/django/response-model-to-json/
def searchinfo(request):
    print(request.user.id)
    waffle = request.user.id
    if request.method == 'GET':
        userSearch = Search.objects.filter(user_id=waffle)
        data_list = serializers.serialize('json', userSearch)
        return HttpResponse(data_list, content_type='text/json-comment-filtered')

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
