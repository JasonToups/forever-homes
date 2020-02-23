from django.urls import path
from . import views
from django.contrib.auth.models import User

urlpatterns = [
    path('', views.index, name='index'),

    path('users/profile', views.detail_profile, name='detail_profile'),

    path('users/delete', views.delete_profile, name='delete_profile'),
    path('users/intro', views.intro, name='intro'),
    path('users/createprofile/', views.create_profile, name='create_profile'),
    path('users/mainfeed', views.main_feed, name='main_feed'),
    path('users/feedsearch', views.feed_search, name='feed_search'),
    path('users/logout/', views.logout, name='logout'),

    # path('users/password_change_form/', views.password_change, name='password_change'),
    # path('users/password_change_success/', views.password_change_success, name='password_change_success'),

    path('users/logoutsuccess', views.logout_success, name='logout_success'),
    path('users/favorites', views.favorites, name='favorites'),
]


 # gustav-dev adds: 

    # path('registration/password_change_form.html', views.change_password, name=change_password),

    # path('users/password_change_success.html', views.password_success, name='password_success'),

    # path('users/createaccount', views.create_account, name='create_account'),



#  this ones from the documentation:
    # path('accounts/', include('django.contrib.auth.urls')),
