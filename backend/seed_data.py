import os
import sys
import json
from pathlib import Path

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blinko_core.settings')

import django
django.setup()

from apps.products.models import Product
from apps.restaurants.models import Restaurant, FoodItem
from apps.orders.models import Order, RefundRequest
from apps.accounts.models import Customer
from apps.support.models import SupportTicket

def seed():
    print("Clearing existing database records...")
    FoodItem.objects.all().delete()
    Restaurant.objects.all().delete()
    Product.objects.all().delete()
    RefundRequest.objects.all().delete()
    Order.objects.all().delete()
    Customer.objects.all().delete()
    SupportTicket.objects.all().delete()

    json_dir = BASE_DIR / 'seed_json'

    # 1. Seed Groceries
    print("Seeding Grocery Products...")
    with open(json_dir / 'groceries.json', 'r', encoding='utf-8') as f:
        groceries_data = json.load(f)

    for item in groceries_data:
        Product.objects.create(
            id=item['id'],
            name=item['name'],
            description=item.get('description', ''),
            price=item['price'],
            original_price=item.get('originalPrice', item['price']),
            discount=item.get('discount', 0),
            rating=item.get('rating', 4.5),
            review_count=item.get('reviewCount', 100),
            category=item.get('category', 'Grocery'),
            subcategory=item.get('subcategory', ''),
            product_type='grocery',
            in_stock=item.get('inStock', True),
            unit=item.get('unit', '1 unit'),
            brand=item.get('brand', 'Blinko Daily'),
            image=item.get('image', ''),
            tags=item.get('tags', [])
        )
    print(f"Created {Product.objects.filter(product_type='grocery').count()} grocery products.")

    # 2. Seed Essentials
    print("Seeding Essentials Products...")
    with open(json_dir / 'essentials.json', 'r', encoding='utf-8') as f:
        essentials_data = json.load(f)

    for item in essentials_data:
        Product.objects.create(
            id=item['id'],
            name=item['name'],
            description=item.get('description', ''),
            price=item['price'],
            original_price=item.get('originalPrice', item['price']),
            discount=item.get('discount', 0),
            rating=item.get('rating', 4.5),
            review_count=item.get('reviewCount', 50),
            category=item.get('category', 'Essentials'),
            subcategory=item.get('subcategory', ''),
            product_type='essentials',
            in_stock=item.get('inStock', True),
            unit=item.get('unit', '1 pack'),
            brand=item.get('brand', 'Blinko Essentials'),
            image=item.get('image', ''),
            tags=item.get('tags', [])
        )
    print(f"Created {Product.objects.filter(product_type='essentials').count()} essentials products.")

    # 3. Seed Restaurants & Menu Items
    print("Seeding Restaurants & Menu items...")
    with open(json_dir / 'restaurants.json', 'r', encoding='utf-8') as f:
        restaurants_data = json.load(f)

    for r in restaurants_data:
        Restaurant.objects.create(
            id=r['id'],
            name=r['name'],
            cuisine=r.get('cuisine', 'Multi-Cuisine'),
            rating=r.get('rating', 4.3),
            review_count=r.get('reviewCount', 250),
            delivery_time=r.get('deliveryTime', '30-40 mins'),
            delivery_fee=r.get('deliveryFee', 30),
            min_order=r.get('minOrder', 150),
            image=r.get('image', ''),
            promoted=r.get('promoted', False),
            address=r.get('address', '100ft Road, Indiranagar, Bangalore'),
            is_open=r.get('isOpen', True),
            description=r.get('description', ''),
            tags=r.get('tags', [])
        )

    with open(json_dir / 'food_items.json', 'r', encoding='utf-8') as f:
        food_items_data = json.load(f)

    food_item_count = 0
    for menu_item in food_items_data:
        try:
            restaurant = Restaurant.objects.get(id=menu_item['restaurantId'])
            FoodItem.objects.create(
                id=menu_item['id'],
                restaurant=restaurant,
                name=menu_item['name'],
                description=menu_item.get('description', ''),
                price=menu_item['price'],
                image=menu_item.get('image', ''),
                category=menu_item.get('category', 'Main Course'),
                is_veg=menu_item.get('isVeg', True),
                rating=menu_item.get('rating', 4.5),
                popular=menu_item.get('popular', False)
            )
            food_item_count += 1
        except Restaurant.DoesNotExist:
            pass

    print(f"Created {Restaurant.objects.count()} restaurants and {food_item_count} menu dishes.")

    # 4. Seed Default Customer
    print("Seeding Customers...")
    customer = Customer.objects.create(
        id='u1',
        name='Aarav Sharma',
        email='aarav.sharma@example.com',
        phone='+91 98765 43210',
        avatar='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        addresses=[
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
    )

    # 5. Seed Demonstration Orders
    print("Seeding Sample Orders...")
    order1 = Order.objects.create(
        id='BLK-892401',
        user_id='u1',
        customer_name='Aarav Sharma',
        customer_phone='+91 98765 43210',
        status='out_for_delivery',
        total=489.00,
        payment_method='UPI',
        estimated_delivery='12 mins (Arriving around 11:45 AM)',
        address=customer.addresses[0],
        items=[
            {
                'product': {'id': 'g1', 'name': 'Fresh Tomatoes', 'price': 29, 'image': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', 'unit': '500g'},
                'quantity': 2,
                'type': 'grocery'
            },
            {
                'product': {'id': 'g9', 'name': 'Nandini Toned Fresh Milk', 'price': 24, 'image': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', 'unit': '500ml'},
                'quantity': 2,
                'type': 'grocery'
            },
            {
                'product': {'id': 'g17', 'name': "Lay's Classic Salted Chips", 'price': 20, 'image': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', 'unit': '50g'},
                'quantity': 3,
                'type': 'grocery'
            }
        ]
    )

    order2 = Order.objects.create(
        id='BLK-734192',
        user_id='u1',
        customer_name='Aarav Sharma',
        customer_phone='+91 98765 43210',
        status='delivered',
        total=640.00,
        payment_method='Credit Card',
        estimated_delivery='Delivered yesterday at 8:30 PM',
        address=customer.addresses[0],
        items=[
            {
                'product': {'id': 'f1', 'name': 'Butter Chicken Boneless', 'price': 349, 'image': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80'},
                'quantity': 1,
                'type': 'food'
            },
            {
                'product': {'id': 'f3', 'name': 'Garlic Naan (2 pcs)', 'price': 99, 'image': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'},
                'quantity': 2,
                'type': 'food'
            }
        ]
    )

    order3 = Order.objects.create(
        id='BLK-610294',
        user_id='u1',
        customer_name='Aarav Sharma',
        customer_phone='+91 98765 43210',
        status='delivered',
        total=845.00,
        payment_method='UPI',
        estimated_delivery='Delivered on Nov 10, 2026',
        address=customer.addresses[0],
        items=[
            {
                'product': {'id': 'e1', 'name': 'Vim Dishwash Liquid Gel', 'price': 105, 'image': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80'},
                'quantity': 2,
                'type': 'essentials'
            },
            {
                'product': {'id': 'e8', 'name': 'Stainless Steel Knife Set (3 Pcs)', 'price': 399, 'image': 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80'},
                'quantity': 1,
                'type': 'essentials'
            }
        ]
    )

    # 6. Sample Refund Request
    RefundRequest.objects.create(
        id='REF-40912',
        order=order3,
        reason='One dishwash liquid bottle seal was leaking on arrival.',
        amount=105.00,
        status='approved'
    )

    # 7. Sample Support Tickets
    print("Seeding Support Tickets...")
    SupportTicket.objects.create(
        id='TCK-10921',
        name='Aarav Sharma',
        email='aarav.sharma@example.com',
        phone='+91 98765 43210',
        category='returns',
        subject='Damaged packaging for order BLK-610294',
        message='One of the bottles was leaking in transit. Requesting replacement or refund.',
        order_id='BLK-610294',
        status='resolved',
        resolved_by_ai=True
    )

    SupportTicket.objects.create(
        id='TCK-10922',
        name='Priya Patel',
        email='priya.p@example.com',
        category='orders',
        subject='Delayed delivery inquiry',
        message='My order was estimated for 15 minutes but delivery partner got delayed in traffic.',
        order_id='BLK-892401',
        status='in_progress',
        resolved_by_ai=True
    )

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
