from rest_framework import serializers
from .models import Restaurant, FoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    restaurantId = serializers.CharField(source='restaurant_id')
    isVeg = serializers.BooleanField(source='is_veg')

    class Meta:
        model = FoodItem
        fields = [
            'id', 'restaurantId', 'name', 'description', 'price',
            'image', 'category', 'isVeg', 'rating', 'popular'
        ]

class RestaurantSerializer(serializers.ModelSerializer):
    reviewCount = serializers.IntegerField(source='review_count')
    deliveryTime = serializers.CharField(source='delivery_time')
    deliveryFee = serializers.DecimalField(source='delivery_fee', max_digits=6, decimal_places=2)
    minOrder = serializers.DecimalField(source='min_order', max_digits=6, decimal_places=2)
    isOpen = serializers.BooleanField(source='is_open')
    menu = FoodItemSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'cuisine', 'rating', 'reviewCount', 'deliveryTime',
            'deliveryFee', 'minOrder', 'image', 'promoted', 'address',
            'isOpen', 'description', 'tags', 'menu'
        ]
