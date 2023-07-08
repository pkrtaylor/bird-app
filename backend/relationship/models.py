from django.db import models

# Create your models here.


class Relations(models.Model):
    follower = models.CharField()
    followee = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index("follower", "followee", name="relation_index")
        ]

    # string representation of this model
    def __str__(self):
        return [self.follower, self.followee]
