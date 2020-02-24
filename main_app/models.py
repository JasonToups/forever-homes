from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.first_name

class Favorites(models.Model):
    post_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')

class Search(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='search')
    type = models.CharField(max_length=50)
    coat = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
