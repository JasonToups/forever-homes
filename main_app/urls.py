from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('users/<int:user_id>/', views.detail_profile, name='detail_profile'),
    path('users/<int:user_id>/edit/', views.edit_profile, name='edit_profile'),
    path('users/<int:user_id>/delete/', views.delete_profile, name='delete_profile'),

    path('users/intro', views.intro, name='intro'),
    path('users/createprofile', views.create_profile, name='create_profile'),
    path('users/mainfeed', views.main_feed, name='main_feed'),
    path('users/feedsearch', views.feed_search, name='feed_search'),

]