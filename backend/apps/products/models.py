from django.db import models

class Product(models.Model):
    TYPE_CHOICES = [
        ('grocery', 'Grocery'),
        ('essentials', 'Essentials'),
    ]

    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.IntegerField(default=0)
    rating = models.FloatField(default=4.5)
    review_count = models.IntegerField(default=0)
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100, blank=True)
    product_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='grocery')
    in_stock = models.BooleanField(default=True)
    unit = models.CharField(max_length=50, default='1 unit')
    brand = models.CharField(max_length=100, default='Blinko')
    image = models.URLField(max_length=1000)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.id})"
