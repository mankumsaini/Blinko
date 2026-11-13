import { Heart, Plus, Minus, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';

interface ProductCardProps {
  product: Product;
  itemType?: 'grocery' | 'essentials';
}

export default function ProductCard({ product, itemType = 'grocery' }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-[#FF6B00] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-red-50 text-red-500 shadow-xs'
            : 'bg-white/80 backdrop-blur-xs text-gray-400 hover:text-red-500 hover:bg-white shadow-2xs'
        }`}
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 stroke-red-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
            <span className="font-semibold text-gray-500 uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h4 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight group-hover:text-[#FF6B00] transition-colors">
            {product.name}
          </h4>

          <p className="text-[11px] text-gray-500 mt-0.5">{product.unit}</p>
        </div>

        {/* Price & Add button */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-sm text-[#0F1B2D]">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Cart Stepper / Add button */}
          {!product.inStock ? (
            <button
              disabled
              className="text-[11px] font-bold px-3 py-1.5 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
            >
              Unavailable
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={() => addToCart(product, itemType)}
              className="text-xs font-bold px-3.5 py-1.5 bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg shadow-2xs transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#FF6B00] text-white rounded-lg px-1 py-1 shadow-xs">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-black">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
