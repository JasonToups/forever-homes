from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import ProfileForm
from .models import Profile, Favorites, Search
from django.contrib.auth.models import User

from django.shortcuts import render, redirect


# adds these for user delete functionality:  
# from .forms import UserDeleteForm
# from django.contrib.auth.decorators import login_required
# from django.shortcuts import render, redirect
# from django.contrib import messages




# from .forms import LoginFormpi

# from django.contrib


# taking a web request and returns a web response.
# fetch objects from database
# modify those objects
# render forms
# return HTML


def index(request):
    return render(request, 'index.html', {})
    # return HttpResponse('<h1>Account Homepage!</h1>')


def intro(request):
    print('intro')
    return render(request, 'intro.html')

    # return HttpResponse('<h1>Intro (Between Create Account and Profile)!</h1>')
    # return HttpResponse('<h1>Intro (Between Create Account and Profile)!</h1>')

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


# uses adamnfish method https: // stackoverflow.com/questions/5895588/django-multivaluedictkeyerror-error-how-do-i-deal-with-it
def feed_search(request):
    if request.method == 'POST':
            searchUser = request.user
            type = request.POST['type1']
            coat = request.POST.get('type2', False)
            color = request.POST['type3']
            gender = request.POST['type4']
            searchFields = Search(user=searchUser, type=type, coat=coat, color=color, gender=gender)
            searchFields.save()
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

# from cat-collectr
def profile(request, username):
        user = User.objects.get(username=username)

        # cats= Cat.objects.filter(user=user)
        return render(request, 'profile.html', {'username': username})
        # return render(request, 'profile.html', {'username': username, 'cats': cats})

def favorites(request):
    return render(request, 'favorites.html')

