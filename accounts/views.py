from django.http import HttpResponse

def index(request):
    return HttpResponse('<h1>Accounts Homepage!</h1>')