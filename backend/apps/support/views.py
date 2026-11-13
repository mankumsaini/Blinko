import random
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SupportTicket
from .serializers import SupportTicketSerializer

class SupportTicketListCreateView(generics.ListCreateAPIView):
    queryset = SupportTicket.objects.all().order_by('-created_at')
    serializer_class = SupportTicketSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('id'):
            data['id'] = f"TCK-{random.randint(10000, 99999)}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class SupportRootStatusView(APIView):
    """
    Dedicated SupportRoot AI integration status & webhook endpoint.
    Allows external SupportRoot AI platform to verify backend connectivity,
    sync conversation transcripts, or trigger automated order status replies.
    """
    def get(self, request):
        return Response({
            "service": "SupportRoot AI Integration Bridge",
            "status": "ready",
            "version": "1.0.0",
            "compatible": True,
            "company": "Blinko Quick Commerce",
            "supportedFeatures": [
                "order_status_lookup",
                "refund_request_escalation",
                "realtime_context_handoff",
                "webhook_dispatch"
            ]
        })

    def post(self, request):
        # Webhook handler for SupportRoot AI events
        event_type = request.data.get('event', 'message')
        payload = request.data.get('payload', {})
        return Response({
            "received": True,
            "event": event_type,
            "message": "SupportRoot AI webhook acknowledged."
        }, status=status.HTTP_200_OK)
