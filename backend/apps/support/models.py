from django.db import models

class SupportTicket(models.Model):
    CATEGORY_CHOICES = [
        ('orders', 'Orders & Delivery'),
        ('payments', 'Payments & Refunds'),
        ('product', 'Product Information'),
        ('account', 'Account & Login'),
        ('cancellations', 'Cancellations'),
        ('returns', 'Returns & Replacements'),
        ('restaurant', 'Restaurant Orders'),
        ('general', 'General Queries'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    order_id = models.CharField(max_length=60, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    resolved_by_ai = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} - {self.subject} ({self.status})"
