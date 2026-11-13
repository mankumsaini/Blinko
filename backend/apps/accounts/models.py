from django.db import models

class Customer(models.Model):
    id = models.CharField(max_length=60, primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, default='9876543210')
    avatar = models.URLField(max_length=500, blank=True)
    addresses = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
