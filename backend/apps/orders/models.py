from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.CharField(max_length=60, primary_key=True)
    user_id = models.CharField(max_length=100, default='u1')
    customer_name = models.CharField(max_length=150, default='Customer')
    customer_phone = models.CharField(max_length=50, default='9876543210')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='confirmed')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField(default=list)
    address = models.JSONField(default=dict)
    payment_method = models.CharField(max_length=50, default='UPI')
    restaurant_id = models.CharField(max_length=50, blank=True, null=True)
    estimated_delivery = models.CharField(max_length=100, default='15-20 mins')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} - {self.status} (₹{self.total})"

class RefundRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    id = models.CharField(max_length=60, primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='refund_requests')
    reason = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Refund {self.id} for Order {self.order.id} - {self.status}"
