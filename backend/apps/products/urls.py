from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryListView.as_view(), name='product-categories'),
    path('<str:id>/', ProductDetailView.as_view(), name='product-detail'),
]
