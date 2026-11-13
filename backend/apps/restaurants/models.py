from django.db import models

class Restaurant(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=150)
    rating = models.FloatField(default=4.3)
    review_count = models.IntegerField(default=0)
    delivery_time = models.CharField(max_length=50, default='30 mins')
    delivery_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    min_order = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    image = models.URLField(max_length=1000)
    promoted = models.BooleanField(default=False)
    address = models.CharField(max_length=300)
    is_open = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.id})"

class FoodItem(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.URLField(max_length=1000)
    category = models.CharField(max_length=100)
    is_veg = models.BooleanField(default=True)
    rating = models.FloatField(default=4.5)
    popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"
