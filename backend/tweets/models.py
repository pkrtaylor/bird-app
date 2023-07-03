from account.models import User
from django.db import models
import uuid
from .ltree import LtreeField
# Create your models here.


class Tweet(models.Model):
    tweet_id = models.UUIDField(primary_key=True, unique=True,
                                default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=255, blank=True, default='')
    media = models.ImageField(upload_to='images/', blank=True, null=True)

    id = models.ForeignKey(
        User, name='user_id', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    is_reply = models.BooleanField(default=False)
    parent = models.ForeignKey('self', null=True, related_name='children',
                               on_delete=models.CASCADE)
    code = models.CharField(max_length=255, blank=True, default='')
    path = LtreeField()

    # string representation of this model
    def __str__(self):
        return self.text
