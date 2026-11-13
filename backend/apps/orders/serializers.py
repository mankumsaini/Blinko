from rest_framework import serializers
from .models import Order, RefundRequest

class OrderSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='user_id', required=False)
    customerName = serializers.CharField(source='customer_name', required=False)
    customerPhone = serializers.CharField(source='customer_phone', required=False)
    paymentMethod = serializers.CharField(source='payment_method', required=False)
    restaurantId = serializers.CharField(source='restaurant_id', required=False, allow_null=True)
    estimatedDelivery = serializers.CharField(source='estimated_delivery', required=False)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'userId', 'customerName', 'customerPhone', 'status',
            'total', 'items', 'address', 'paymentMethod', 'restaurantId',
            'estimatedDelivery', 'createdAt'
        ]

class RefundRequestSerializer(serializers.ModelSerializer):
    orderId = serializers.CharField(source='order_id')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = RefundRequest
        fields = ['id', 'orderId', 'reason', 'amount', 'status', 'createdAt']
