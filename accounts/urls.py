from django.urls import path, include
from . import views
# from .main_app import views
urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    # path('accounts/password_change/', views.password_change, name='password_change'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/password/change', views.custom_password_change),
]