from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .forms import ProfileForm
from .models import Profile, Favorites, Search
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from django.core import serializers
from django.contrib.auth.decorators import login_required

@login_required
def password_change(request):
    return render(request, 'password_change_form.html')

@login_required
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

@login_required
def password_change_success(request):
    return render(request, 'password_change_success.html')

def intro(request):
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

def main_feed(request):
    return render(request, 'main_feed.html')

@login_required
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
    the_user_id = request.user.id
    if request.method == 'GET':
        user_Search = Search.objects.filter(user_id=the_user_id)
        data_list = serializers.serialize('json', user_Search)
        return HttpResponse(data_list, content_type='text/json-comment-filtered')

@login_required
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

@login_required
def delete_profile(request):
    u = User.objects.get(pk=request.user.id)
    u.is_active = False
    u.save()
    return redirect('main_feed')

@login_required
def logout(request):
    logout(request)
    return render(request, 'logout_success.html')


def logout_success(request):
        logout_success(request)
        return redirect('/')

@login_required
def favorites(request):
    return render(request, 'favorites.html')

def about(request):
    return render(request, 'about.html')
