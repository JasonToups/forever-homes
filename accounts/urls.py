from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls import include


urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('password_change/', views.change_password, name = 'password_change'),
    path('logout/', views.logout, name= 'logout'),
]
