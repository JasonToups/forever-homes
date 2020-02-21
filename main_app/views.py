from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import ProfileForm

from django.shortcuts import render, redirect

# from .forms import LoginFormpi

# from django.contrib


# taking a web request and returns a web response.
# fetch objects from database
# modify those objects
# render forms
# return HTML


def index(request):



    return HttpResponse('<h1>Homepage!</h1>')

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

def feed_search(request):
    return HttpResponse('<h1>Main Feed Search!</h1>')


# I've added this to make sure a request directs to the detail_profile with the necessary elements:


def detail_profile(request):
    # return HttpResponse('<h1>Detail Profile View!</h1>')
    return render(request, 'detail_profile.html', {'username': username})


def edit_profile(request):
    # return HttpResponse('<h1>Edit Profile!</h1>')
    return render(request, 'detail_profile.html', {'username': username})

def delete_profile(request):
    # return HttpResponse('<h1>Delete Profile!</h1>')
    return render(request, 'detail_profile.html', {'username': username})

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

