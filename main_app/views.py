from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import ProfileForm

def index(request):
    return HttpResponse('<h1>Homepage!</h1>')

def intro(request):
    return HttpResponse('<h1>Intro (Between Create Account and Profile)!</h1>')

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

def detail_profile(request):
    return HttpResponse('<h1>Detail Profile View!</h1>')

def edit_profile(request):
    return HttpResponse('<h1>Edit Profile!</h1>')

def delete_profile(request):
    return HttpResponse('<h1>Delete Profile!</h1>')