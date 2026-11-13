from rest_framework.views import APIView
from rest_framework.response import Response
from apps.products.models import Product
from apps.restaurants.models import Restaurant
from apps.orders.models import Order, RefundRequest

class DashboardAnalyticsView(APIView):
    def get(self, request):
        # Calculate real-time counts from db
        product_count = Product.objects.count()
        restaurant_count = Restaurant.objects.count()
        total_orders_count = Order.objects.count()
        active_orders_count = Order.objects.filter(
            status__in=['processing', 'confirmed', 'preparing', 'out_for_delivery']
        ).count()
        cancelled_orders_count = Order.objects.filter(status='cancelled').count()
        refund_requests_count = RefundRequest.objects.count()

        # Fictional demonstration aggregated statistics 2021-2026
        data = {
            "summary": {
                "totalRevenue": 48259000,
                "revenueFormatted": "₹4.82 Cr",
                "totalOrders": 1248500 + total_orders_count,
                "totalCustomers": 382400,
                "productsSold": 3491200,
                "activeOrders": max(142, active_orders_count),
                "cancelledOrders": max(1840, cancelled_orders_count),
                "refundRequests": max(324, refund_requests_count),
                "customerSatisfaction": 4.86,
                "avgDeliveryTimeMins": 12.4,
                "activeDeliveryPartners": 2840
            },
            "growthByYear": [
                {"year": 2021, "revenue": 1400000, "orders": 42000, "activeUsers": 18000, "milestone": "Founding & 1st Micro-warehouse in Bangalore"},
                {"year": 2022, "revenue": 6200000, "orders": 185000, "activeUsers": 72000, "milestone": "Launched 10-min Daily Grocery in 3 cities"},
                {"year": 2023, "revenue": 15800000, "orders": 440000, "activeUsers": 160000, "milestone": "Introduced Blinko Eats Food Delivery"},
                {"year": 2024, "revenue": 29400000, "orders": 790000, "activeUsers": 265000, "milestone": "Expanded to Blinko Essentials Household goods"},
                {"year": 2025, "revenue": 41200000, "orders": 1050000, "activeUsers": 340000, "milestone": "Autonomous micro-fulfillment tech deployed"},
                {"year": 2026, "revenue": 48259000, "orders": 1248500, "activeUsers": 382400, "milestone": "SupportRoot AI agent integrated across all services"}
            ],
            "monthlySales2026": [
                {"month": "Jan", "orders": 98400, "revenue": 3850000},
                {"month": "Feb", "orders": 102100, "revenue": 4010000},
                {"month": "Mar", "orders": 108300, "revenue": 4230000},
                {"month": "Apr", "orders": 104500, "revenue": 4090000},
                {"month": "May", "orders": 112000, "revenue": 4380000},
                {"month": "Jun", "orders": 115200, "revenue": 4510000},
                {"month": "Jul", "orders": 118400, "revenue": 4620000},
                {"month": "Aug", "orders": 122100, "revenue": 4790000},
                {"month": "Sep", "orders": 124500, "revenue": 4880000},
                {"month": "Oct", "orders": 129000, "revenue": 5050000},
                {"month": "Nov", "orders": 133400, "revenue": 5210000}
            ],
            "categoryBreakdown": [
                {"category": "Blinko Daily (Grocery)", "sharePercent": 54, "revenueFormatted": "₹2.60 Cr"},
                {"category": "Blinko Eats (Food)", "sharePercent": 32, "revenueFormatted": "₹1.54 Cr"},
                {"category": "Blinko Essentials", "sharePercent": 14, "revenueFormatted": "₹0.68 Cr"}
            ],
            "topSellingProducts": [
                {"id": "g1", "name": "Fresh Farm Tomatoes", "category": "Fruits & Vegetables", "sold": 48290, "revenue": "₹14.0 L"},
                {"id": "g9", "name": "Nandini Toned Fresh Milk", "category": "Dairy & Bakery", "sold": 44100, "revenue": "₹10.6 L"},
                {"id": "g17", "name": "Lay's Classic Salted Chips", "category": "Snacks & Beverages", "sold": 39500, "revenue": "₹7.9 L"},
                {"id": "g25", "name": "India Gate Basmati Rice", "category": "Rice & Grains", "sold": 28400, "revenue": "₹36.9 L"},
                {"id": "e1", "name": "Vim Dishwash Liquid Gel", "category": "Cleaning Supplies", "sold": 22100, "revenue": "₹23.2 L"}
            ],
            "topRestaurants": [
                {"id": "r1", "name": "Punjab Grill & Co.", "orders": 18240, "rating": 4.6, "cuisine": "North Indian"},
                {"id": "r4", "name": "Pizza Roma Artisanal", "orders": 16900, "rating": 4.7, "cuisine": "Pizza"},
                {"id": "r2", "name": "Dakshin Udupi Cafe", "orders": 15400, "rating": 4.8, "cuisine": "South Indian"},
                {"id": "r3", "name": "Golden Dragon Wok", "orders": 13800, "rating": 4.5, "cuisine": "Chinese"},
                {"id": "r6", "name": "Sweet Tooth Patisserie", "orders": 12100, "rating": 4.8, "cuisine": "Desserts"}
            ],
            "demoNotice": "All figures, historical trends (2021–2026), and analytics are fictional sample data for demonstration purposes."
        }
        return Response(data)
