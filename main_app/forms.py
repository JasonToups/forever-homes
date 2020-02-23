from django import forms
from .models import Profile, User


# class Meta:
#     model = User
#     fields = (
#         'username', 
#         'first_name', 
#         'last_name', 
#         'email', 
#         'password1', 
#         'password2'
#     )




class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'email')

# class PasswordChangeForm(forms.ModelForm):
#     class Meta: 
#         model = User
#         fields = ('password',)


        # main_app/forms.py
# from django import forms

# class CatForm(forms.Form):
#     name = forms.CharField(label='Name', max_length=100)
#     breed = forms.CharField(label='Breed', max_length=100)
#     description = forms.CharField(label='Description', max_length=250)
# 		age = forms.IntegerField(label='Age')