from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('apps.products.urls')),
    path('api/restaurants/', include('apps.restaurants.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    path('api/support/', include('apps.support.urls')),
]
