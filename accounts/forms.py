from django import forms


# adds these to try get the delete users account functionality to work:  
# https://www.reddit.com/r/webdev/comments/cjfmg8/django_deleting_user_accounts/
# from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput())


