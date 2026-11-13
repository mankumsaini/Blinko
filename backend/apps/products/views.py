from rest_framework import generics, filters
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        product_type = self.request.query_params.get('type')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        in_stock = self.request.query_params.get('in_stock')

        if product_type:
            queryset = queryset.filter(product_type=product_type)
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)
        if in_stock is not None:
            queryset = queryset.filter(in_stock=in_stock.lower() == 'true')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) | 
                Q(category__icontains=search) |
                Q(brand__icontains=search)
            )
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

class CategoryListView(APIView):
    def get(self, request):
        product_type = request.query_params.get('type', 'grocery')
        categories = (
            Product.objects.filter(product_type=product_type)
            .values_list('category', flat=True)
            .distinct()
        )
        return Response(list(categories))
