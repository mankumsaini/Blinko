from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Customer
from .serializers import CustomerSerializer

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'id'

class CurrentUserView(APIView):
    def get(self, request):
        # Demo default user
        customer, created = Customer.objects.get_or_create(
            id='u1',
            defaults={
                'name': 'Aarav Sharma',
                'email': 'aarav.sharma@example.com',
                'phone': '+91 98765 43210',
                'avatar': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                'addresses': [
                    {
                        'id': 'addr1',
                        'type': 'home',
                        'line1': 'Flat 402, Green Glen Layout, Bellandur',
                        'line2': 'Near Outer Ring Road',
                        'city': 'Bangalore',
                        'state': 'Karnataka',
                        'pincode': '560103',
                        'isDefault': True
                    },
                    {
                        'id': 'addr2',
                        'type': 'work',
                        'line1': 'Tech Park Tower 3, 5th Floor',
                        'line2': 'Whitefield Main Road',
                        'city': 'Bangalore',
                        'state': 'Karnataka',
                        'pincode': '560066',
                        'isDefault': False
                    }
                ]
            }
        )
        return Response(CustomerSerializer(customer).data)
