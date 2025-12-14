from django.db import models

class Sensor(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    min_temp = models.FloatField(default=2)
    max_temp = models.FloatField(default=8)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.location}"
