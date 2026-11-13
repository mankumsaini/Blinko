from rest_framework import generics
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Restaurant, FoodItem
from .serializers import RestaurantSerializer, FoodItemSerializer

class RestaurantListView(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.all().prefetch_related('menu')
        cuisine = self.request.query_params.get('cuisine')
        search = self.request.query_params.get('search')
        is_open = self.request.query_params.get('is_open')
        promoted = self.request.query_params.get('promoted')

        if cuisine and cuisine.lower() != 'all':
            queryset = queryset.filter(
                Q(cuisine__icontains=cuisine) | Q(tags__icontains=cuisine)
            )
        if is_open is not None:
            queryset = queryset.filter(is_open=is_open.lower() == 'true')
        if promoted is not None:
            queryset = queryset.filter(promoted=promoted.lower() == 'true')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(cuisine__icontains=search) |
                Q(description__icontains=search) |
                Q(menu__name__icontains=search)
            ).distinct()
        return queryset

class RestaurantDetailView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all().prefetch_related('menu')
    serializer_class = RestaurantSerializer
    lookup_field = 'id'

class CuisineListView(APIView):
    def get(self, request):
        cuisines = [
            'North Indian',
            'South Indian',
            'Chinese',
            'Pizza',
            'Burgers',
            'Desserts',
            'Beverages',
            'Fast Food'
        ]
        return Response(cuisines)
