from django.urls import path
from . import views

urlpatterns = [
    path('users/profile', views.detail_profile, name='detail_profile'),
    path('users/delete', views.delete_profile, name='delete_profile'),

    path('users/intro', views.intro, name='intro'),
    path('users/createprofile/', views.create_profile, name='create_profile'),
    path('users/mainfeed', views.main_feed, name='main_feed'),
    path('users/feedsearch', views.feed_search, name='feed_search'),
    path('users/searchinfo', views.searchinfo, name='searchinfo'),

    # gustav-dev adds: 
    path('users/logout/', views.logout, name='logout'),


    # path('users/createaccount', views.create_account, name='create_account'),
    path('users/logoutsuccess', views.logout_success, name='logout_success'),

    
    path('users/favorites', views.favorites, name='favorites'),
]