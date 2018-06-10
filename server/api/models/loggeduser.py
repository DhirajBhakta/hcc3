from django.db import models
from django.db.utils import IntegrityError
from django.contrib.auth.signals import user_logged_in, user_logged_out  
from django.contrib.auth.models import User

class LoggedUser(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  
  def __unicode__(self):
    return self.user.objects.get().username

def login_user(sender, request, user, **kwargs):
  try:
    new_item = LoggedUser(user=user)
    new_item.save()
    return new_item
  except IntegrityError as IE:
    existing = LoggedUser.objects.get(user=user)
    return existing


def logout_user(sender, request, user, **kwargs):
  try:
    u = LoggedUser.objects.get(user_username=user.username)
    u.delete()
  except LoggedUser.DoesNotExist:
    pass
    
user_logged_in.connect(login_user)
user_logged_out.connect(logout_user)
