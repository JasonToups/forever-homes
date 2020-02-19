from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse('<h1>Homepage!</h1>')

def intro(request):
    return HttpResponse('<h1>Intro (Between Create Account and Profile)!</h1>')

def create_profile(request):
    return HttpResponse('<h1>Create Profile!</h1>')

def main_feed(request):
    return HttpResponse('<h1>Main Feed!</h1>')

def feed_search(request):
    return HttpResponse('<h1>Main Feed Search!</h1>')

def detail_profile(request):
    return HttpResponse('<h1>Detail Profile View!</h1>')

def edit_profile(request):
    return HttpResponse('<h1>Edit Profile!</h1>')

def delete_profile(request):
    return HttpResponse('<h1>Delete Profile!</h1>')