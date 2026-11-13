from django.urls import path
from .views import CustomerListCreateView, CustomerDetailView, CurrentUserView

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('<str:id>/', CustomerDetailView.as_view(), name='customer-detail'),
]
