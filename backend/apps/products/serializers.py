from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    originalPrice = serializers.DecimalField(source='original_price', max_digits=10, decimal_places=2)
    reviewCount = serializers.IntegerField(source='review_count')
    inStock = serializers.BooleanField(source='in_stock')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'originalPrice',
            'discount', 'rating', 'reviewCount', 'category', 'subcategory',
            'product_type', 'inStock', 'unit', 'brand', 'image', 'tags'
        ]
