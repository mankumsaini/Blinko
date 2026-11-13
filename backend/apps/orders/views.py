import random
import uuid
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order, RefundRequest
from .serializers import OrderSerializer, RefundRequestSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        status_filter = self.request.query_params.get('status')
        queryset = Order.objects.all().order_by('-created_at')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('id'):
            data['id'] = f"BLK-{random.randint(100000, 999999)}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderDetailView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'id'

class OrderCancelView(APIView):
    def post(self, request, id):
        try:
            order = Order.objects.get(id=id)
            if order.status in ['delivered', 'cancelled']:
                return Response(
                    {'error': f"Cannot cancel an order with status '{order.status}'"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            order.status = 'cancelled'
            order.save()
            return Response(OrderSerializer(order).data)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

class RefundRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = RefundRequestSerializer

    def get_queryset(self):
        return RefundRequest.objects.all().order_by('-created_at')

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        order_id = data.get('orderId') or data.get('order_id')
        if not order_id:
            return Response({'error': 'orderId is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        refund_id = f"REF-{random.randint(10000, 99999)}"
        amount = data.get('amount') or order.total
        reason = data.get('reason', 'Quality / delivery issue')

        refund = RefundRequest.objects.create(
            id=refund_id,
            order=order,
            reason=reason,
            amount=amount,
            status='pending'
        )
        return Response(RefundRequestSerializer(refund).data, status=status.HTTP_201_CREATED)
