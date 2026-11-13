from django.urls import path
from .views import SupportTicketListCreateView, SupportRootStatusView

urlpatterns = [
    path('tickets/', SupportTicketListCreateView.as_view(), name='support-tickets'),
    path('supportroot/status/', SupportRootStatusView.as_view(), name='supportroot-status'),
    path('supportroot/webhook/', SupportRootStatusView.as_view(), name='supportroot-webhook'),
]
