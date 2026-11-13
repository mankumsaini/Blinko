from django.urls import path
from .views import (
    OrderListCreateView,
    OrderDetailView,
    OrderCancelView,
    RefundRequestListCreateView
)

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list-create'),
    path('<str:id>/', OrderDetailView.as_view(), name='order-detail'),
    path('<str:id>/cancel/', OrderCancelView.as_view(), name='order-cancel'),
    path('refunds/create/', RefundRequestListCreateView.as_view(), name='refund-create'),
    path('refunds/', RefundRequestListCreateView.as_view(), name='refund-list'),
]
