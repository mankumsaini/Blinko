from django.urls import path
from .views import RestaurantListView, RestaurantDetailView, CuisineListView

urlpatterns = [
    path('', RestaurantListView.as_view(), name='restaurant-list'),
    path('cuisines/', CuisineListView.as_view(), name='restaurant-cuisines'),
    path('<str:id>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
]
