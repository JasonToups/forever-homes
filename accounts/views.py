from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
# from accounts.forms import PasswordChangeForm
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import auth
from main_app.models import Profile
from main_app.views import detail_profile
from main_app.views import password_change
from django.contrib.auth import update_session_auth_hash


# from main_app.views import password_change_form

# it's strange that when I delete this that the homepage stops working, but the httpResponse isn't connected to the homepage. Why is this?
def index(request):
    return HttpResponse('<h1>Homepage!</h1>')
    # return render(request, 'index')


class CustomPasswordChangeView(PasswordChangeView):
    @property
    def success_url(self):
        print ('start')
        return 'main_feed.html'
custom_password_change = login_required(CustomPasswordChangeView.as_view())







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

# test to see if this is working:  
def change_password(request):
    if request.method == 'POST':

        form = PasswordChangeForm(request.POST, user=request.user)
        console.log(form)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('/users/password_change_success.html')
            # put in a url page here.  similar to line 35 in views.  
        else:
            form = PasswordChangeForm(user=request.user)

            args = {'form': form}
            return render(request, '/accounts/change_password.html', args)

# def change_password_link(request):
#     return render(request, 'password_change_form.html')




# this one
# def change_password(request):
#     if request.method == 'POST':
#         form = PasswordChangeForm(data=request.POST, user=request.user)

#         if form.is_valid():
#             form.save()
#             return render(request, 'password_change_success.html')

#     else:
#         form = PasswordChangeForm(user=request.user)
#         args = {'form': form}
#         return render(request, 'password_change_form.html', args)



# def change_password(request):
#     if request.method == 'POST':
#         form =PasswordChangeForm(request.POST, instance=request.user)

#         if  form.is_valid():
#             form.save()
#             return redirect('/users/password_change_success')






def logout_view(request):
    auth.logout(request)
    return redirect('main_feed')

# https://codereview.stackexchange.com/questions/212988/django-delete-user-from-userprofile
# https://git.generalassemb.ly/sf-sei-7/django-views-and-templates

def delete_profile(self):
    self.objects.get(id=pk).delete()
    return redirect('logout_success')

# could this work?  
# def delete_user(self):
#     self.User.delete()




# scratching the below features:  
# https://stackoverflow.com/questions/45780470/django-registration-how-to-allow-user-delete-their-account?rq=1




# using allauth in Django:  
# https://stackoverflow.com/questions/38047408/how-to-allow-user-to-delete-account-in-django-allauth
# installation instructions for allauth:  https://django-allauth.readthedocs.io/en/latest/installation.html

