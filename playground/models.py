from distutils.command.upload import upload
from django.contrib.auth.models import User
from django.db import models
from django.core.serializers.json import DjangoJSONEncoder
from django.urls import reverse
import json




class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/")
    rating = models.PositiveSmallIntegerField()


class Game(models.Model):
    player1 = models.ForeignKey('Player', related_name='player1', on_delete=models.PROTECT)
    player2 = models.ForeignKey('Player', related_name='player2', on_delete=models.PROTECT)
    is_player1_win = models.BooleanField(default=True)
    time_create = models.DateTimeField(auto_now_add=True)
    array = models.TextField()

    def get_absolute_url(self):
        return reverse('game', kwargs={'game_id': self.pk})


# Create your models here.
