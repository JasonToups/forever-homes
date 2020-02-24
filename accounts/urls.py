from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls import include


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    # path('account/', account_view, name="account"),

    # this interferes with our login:  
    # path('accounts/', include('django.contrib.auth.urls')),

    # # Password reset links:  
    # path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='registration/password_change_done.html'),
    #     name='password_change_complete'), 

    path('password_change/', views.change_password,
        name = 'password_change'),

    path('logout/', views.logout, name= 'logout'),

    # # path('password_reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_done.html'),
    # #     name= 'password_reset_done'),

    # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),

    # # path('reset/done/', auth_views.PaswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), 
    # #     name='password_reset_complete'),

]

# auth_views.PasswordChangeView.as_view(template_name='registration/password_change.html'