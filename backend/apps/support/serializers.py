from rest_framework import serializers
from .models import SupportTicket

class SupportTicketSerializer(serializers.ModelSerializer):
    orderId = serializers.CharField(source='order_id', required=False, allow_null=True, allow_blank=True)
    resolvedByAi = serializers.BooleanField(source='resolved_by_ai', required=False)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = SupportTicket
        fields = [
            'id', 'name', 'email', 'phone', 'category', 'subject',
            'message', 'orderId', 'status', 'resolvedByAi', 'createdAt'
        ]
