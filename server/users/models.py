from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Dreams(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dream_description = models.TextField()

    def __str__(self):
        return f"{self.user}'s Dream"