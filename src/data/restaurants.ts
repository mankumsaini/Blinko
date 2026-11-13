import type { Restaurant, FoodItem } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1', name: 'Punjabi Dhaba Co.', cuisine: 'North Indian', rating: 4.6, reviewCount: 2340,
    deliveryTime: '25-30 min', deliveryFee: 29, minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '14, MG Road, Bangalore', isOpen: true,
    tags: ['Butter Chicken', 'Dal Makhani', 'Naan', 'North Indian'],
    description: 'Authentic Punjabi flavours cooked in a tandoor, just like back home.',
  },
  {
    id: 'r2', name: 'Spice Garden', cuisine: 'South Indian', rating: 4.4, reviewCount: 1870,
    deliveryTime: '20-25 min', deliveryFee: 0, minOrder: 149,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '8, Jayanagar 4th Block, Bangalore', isOpen: true,
    tags: ['Dosa', 'Idli', 'Sambar', 'South Indian'],
    description: 'Traditional South Indian breakfast and meals, freshly prepared.',
  },
  {
    id: 'r3', name: 'Wok Express', cuisine: 'Chinese', rating: 4.3, reviewCount: 1120,
    deliveryTime: '30-35 min', deliveryFee: 39, minOrder: 249,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '22, Koramangala 5th Block, Bangalore', isOpen: true,
    tags: ['Noodles', 'Fried Rice', 'Manchurian', 'Chinese'],
    description: 'Indo-Chinese wok dishes tossed fresh to order.',
  },
  {
    id: 'r4', name: 'Pizza Paradise', cuisine: 'Pizza', rating: 4.7, reviewCount: 3200,
    deliveryTime: '35-40 min', deliveryFee: 0, minOrder: 299,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: true, address: '56, Indiranagar 100ft Road, Bangalore', isOpen: true,
    tags: ['Pizza', 'Pasta', 'Italian', 'Promoted'],
    description: 'Hand-tossed wood-fired pizzas with fresh toppings.',
  },
  {
    id: 'r5', name: 'Burger Barn', cuisine: 'Burgers', rating: 4.5, reviewCount: 2100,
    deliveryTime: '20-25 min', deliveryFee: 29, minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '33, HSR Layout, Bangalore', isOpen: true,
    tags: ['Burgers', 'Fries', 'Shakes', 'Fast Food'],
    description: 'Juicy flame-grilled burgers with fresh lettuce and special sauces.',
  },
  {
    id: 'r6', name: 'Dessert Street', cuisine: 'Desserts', rating: 4.8, reviewCount: 1680,
    deliveryTime: '25-30 min', deliveryFee: 19, minOrder: 99,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '7, Cunningham Road, Bangalore', isOpen: true,
    tags: ['Cakes', 'Ice Cream', 'Waffles', 'Desserts'],
    description: 'Sweet treats and desserts that make every occasion special.',
  },
  {
    id: 'r7', name: 'Biryani Blues', cuisine: 'North Indian', rating: 4.6, reviewCount: 2890,
    deliveryTime: '30-35 min', deliveryFee: 0, minOrder: 299,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: true, address: '45, Frazer Town, Bangalore', isOpen: true,
    tags: ['Biryani', 'Kebab', 'North Indian', 'Promoted'],
    description: 'Dum-cooked biryanis in classic Hyderabadi and Lucknowi styles.',
  },
  {
    id: 'r8', name: 'Dosa Delight', cuisine: 'South Indian', rating: 4.3, reviewCount: 980,
    deliveryTime: '20-25 min', deliveryFee: 19, minOrder: 149,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '12, Basavanagudi, Bangalore', isOpen: true,
    tags: ['Dosa', 'Uttapam', 'South Indian'],
    description: 'Crispy dosas and hearty South Indian fare, made fresh.',
  },
  {
    id: 'r9', name: 'The Noodle Bar', cuisine: 'Chinese', rating: 4.2, reviewCount: 760,
    deliveryTime: '25-30 min', deliveryFee: 39, minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '28, Commercial Street, Bangalore', isOpen: true,
    tags: ['Noodles', 'Dim Sum', 'Chinese', 'Pan-Asian'],
    description: 'Authentic Asian noodle dishes and dim sum platters.',
  },
  {
    id: 'r10', name: 'Mumbai Street Bites', cuisine: 'Fast Food', rating: 4.5, reviewCount: 1540,
    deliveryTime: '15-20 min', deliveryFee: 19, minOrder: 149,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '3, Shivajinagar, Bangalore', isOpen: true,
    tags: ['Vada Pav', 'Pav Bhaji', 'Chaat', 'Street Food'],
    description: 'Street food favourites from Mumbai — chaats, vada pav and more.',
  },
  {
    id: 'r11', name: 'The Cake Factory', cuisine: 'Desserts', rating: 4.9, reviewCount: 2140,
    deliveryTime: '35-40 min', deliveryFee: 29, minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: true, address: '19, Richmond Road, Bangalore', isOpen: true,
    tags: ['Cakes', 'Pastries', 'Cookies', 'Promoted'],
    description: 'Artisan cakes, pastries and baked goods for every celebration.',
  },
  {
    id: 'r12', name: 'Royal Curry House', cuisine: 'North Indian', rating: 4.4, reviewCount: 1340,
    deliveryTime: '30-35 min', deliveryFee: 0, minOrder: 299,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '67, Sadashivanagar, Bangalore', isOpen: true,
    tags: ['Curry', 'Roti', 'Kebab', 'North Indian'],
    description: 'Royal Mughlai curries and tandoor-grilled kebabs.',
  },
  {
    id: 'r13', name: 'Meenakshi South Kitchen', cuisine: 'South Indian', rating: 4.6, reviewCount: 1120,
    deliveryTime: '25-30 min', deliveryFee: 19, minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '5, T Nagar, Bangalore', isOpen: true,
    tags: ['Thali', 'Rasam', 'Pongal', 'South Indian'],
    description: 'Full South Indian thalis and traditional Tamil Nadu recipes.',
  },
  {
    id: 'r14', name: 'Dragon Palace', cuisine: 'Chinese', rating: 4.1, reviewCount: 640,
    deliveryTime: '30-40 min', deliveryFee: 49, minOrder: 299,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    promoted: false, address: '11, Whitefield, Bangalore', isOpen: true,
    tags: ['Chinese', 'Schezwan', 'Dim Sum'],
    description: 'Bold Chinese flavours with a Sichuan twist.',
  },
  {
    id: 'r15', name: 'Wraps & Rolls', cuisine: 'Fast Food', rating: 4.3, reviewCount: 870,
    deliveryTime: '15-20 min', deliveryFee: 19, minOrder: 149,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    promoted: false, address: '24, Electronic City, Bangalore', isOpen: true,
    tags: ['Wraps', 'Rolls', 'Kathi Roll', 'Fast Food'],
    description: 'Freshly grilled kathi rolls and wraps packed with flavour.',
  },
];

// ── Food Items (10 per restaurant) ───────────────────────────────────────────

function foodItems(restaurantId: string, items: Omit<FoodItem, 'restaurantId'>[]): FoodItem[] {
  return items.map((i) => ({ ...i, restaurantId }));
}

export const FOOD_ITEMS: FoodItem[] = [
  // r1 — Punjabi Dhaba Co.
  ...foodItems('r1', [
    { id: 'f1_1', name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato-butter gravy.', price: 319, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.8, popular: true },
    { id: 'f1_2', name: 'Dal Makhani', description: 'Slow-cooked black lentils in buttery tomato gravy.', price: 249, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.7, popular: true },
    { id: 'f1_3', name: 'Paneer Butter Masala', description: 'Cottage cheese in velvety orange gravy.', price: 279, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.6, popular: false },
    { id: 'f1_4', name: 'Garlic Naan', description: 'Soft leavened bread with garlic butter.', price: 59, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Breads', isVeg: true, rating: 4.5, popular: false },
    { id: 'f1_5', name: 'Tandoori Chicken Half', description: 'Marinated chicken roasted in a clay tandoor.', price: 299, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: false, rating: 4.7, popular: true },
    { id: 'f1_6', name: 'Lassi (Sweet)', description: 'Chilled thick yoghurt drink.', price: 79, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.5, popular: false },
    { id: 'f1_7', name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with spiced chicken.', price: 329, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: false, rating: 4.6, popular: true },
    { id: 'f1_8', name: 'Aloo Paratha', description: 'Whole wheat bread stuffed with spiced potatoes.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Breads', isVeg: true, rating: 4.4, popular: false },
    { id: 'f1_9', name: 'Punjabi Samosa (2 pcs)', description: 'Crispy pastry stuffed with spiced peas and potatoes.', price: 79, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.5, popular: false },
    { id: 'f1_10', name: 'Gulab Jamun (2 pcs)', description: 'Soft milk-solid balls soaked in rose sugar syrup.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.6, popular: false },
  ]),

  // r2 — Spice Garden
  ...foodItems('r2', [
    { id: 'f2_1', name: 'Masala Dosa', description: 'Crispy rice crepe filled with spiced potato.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.7, popular: true },
    { id: 'f2_2', name: 'Idli Sambar (4 pcs)', description: 'Steamed rice cakes with lentil soup and chutneys.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Idli & Vada', isVeg: true, rating: 4.6, popular: true },
    { id: 'f2_3', name: 'Medu Vada (2 pcs)', description: 'Crispy lentil fritters served with sambar.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Idli & Vada', isVeg: true, rating: 4.5, popular: false },
    { id: 'f2_4', name: 'Rava Dosa', description: 'Thin crispy semolina crepe.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.5, popular: false },
    { id: 'f2_5', name: 'Bisi Bele Bath', description: 'Spicy rice and lentil dish cooked with vegetables.', price: 179, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.6, popular: true },
    { id: 'f2_6', name: 'Filter Coffee', description: 'South Indian decoction coffee with frothy milk.', price: 49, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.8, popular: true },
    { id: 'f2_7', name: 'Pongal', description: 'Creamy rice and lentil dish with pepper and ghee.', price: 119, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.5, popular: false },
    { id: 'f2_8', name: 'Upma', description: 'Semolina porridge tempered with mustard and curry leaves.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Breakfast', isVeg: true, rating: 4.3, popular: false },
    { id: 'f2_9', name: 'South Indian Thali', description: 'Complete thali with rice, curries, dal and dessert.', price: 249, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Thalis', isVeg: true, rating: 4.7, popular: true },
    { id: 'f2_10', name: 'Paniyaram (6 pcs)', description: 'Crispy outside, fluffy inside rice dumplings.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.4, popular: false },
  ]),

  // r3 — Wok Express
  ...foodItems('r3', [
    { id: 'f3_1', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with fresh vegetables.', price: 189, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: true, rating: 4.4, popular: true },
    { id: 'f3_2', name: 'Chicken Fried Rice', description: 'Wok-tossed rice with egg and chicken.', price: 219, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: false, rating: 4.5, popular: true },
    { id: 'f3_3', name: 'Gobi Manchurian', description: 'Crispy cauliflower in tangy Manchurian sauce.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.5, popular: true },
    { id: 'f3_4', name: 'Chicken Manchurian', description: 'Crispy chicken in spicy manchurian gravy.', price: 249, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: false, rating: 4.6, popular: false },
    { id: 'f3_5', name: 'Spring Rolls (4 pcs)', description: 'Crispy rolls stuffed with vegetables.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.3, popular: false },
    { id: 'f3_6', name: 'Schezwan Chicken Noodles', description: 'Spicy Schezwan-tossed noodles with chicken.', price: 259, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.5, popular: true },
    { id: 'f3_7', name: 'Hot & Sour Soup', description: 'Tangy clear soup with vegetables and tofu.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Soups', isVeg: true, rating: 4.4, popular: false },
    { id: 'f3_8', name: 'Paneer Chilli', description: 'Cottage cheese in spicy chilli garlic sauce.', price: 229, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.5, popular: false },
    { id: 'f3_9', name: 'Veg Fried Rice', description: 'Classic wok-tossed vegetable fried rice.', price: 169, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.3, popular: false },
    { id: 'f3_10', name: 'Chicken Chow Mein', description: 'Soft noodles wok-tossed with chicken and veggies.', price: 239, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.4, popular: false },
  ]),

  // r4 — Pizza Paradise
  ...foodItems('r4', [
    { id: 'f4_1', name: 'Margherita Pizza', description: 'Classic tomato base with fresh mozzarella and basil.', price: 349, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pizzas', isVeg: true, rating: 4.7, popular: true },
    { id: 'f4_2', name: 'BBQ Chicken Pizza', description: 'Smoky BBQ chicken on a cheesy crispy base.', price: 499, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pizzas', isVeg: false, rating: 4.8, popular: true },
    { id: 'f4_3', name: 'Paneer Tikka Pizza', description: 'Indian-style tikka paneer on a wood-fired base.', price: 449, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pizzas', isVeg: true, rating: 4.6, popular: true },
    { id: 'f4_4', name: 'Penne Arrabbiata', description: 'Penne in spicy tomato and garlic sauce.', price: 299, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pasta', isVeg: true, rating: 4.5, popular: false },
    { id: 'f4_5', name: 'Garlic Bread', description: 'Toasted baguette with herb garlic butter.', price: 149, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.5, popular: false },
    { id: 'f4_6', name: 'Chicken Pasta Alfredo', description: 'Creamy Alfredo pasta with grilled chicken.', price: 379, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pasta', isVeg: false, rating: 4.6, popular: true },
    { id: 'f4_7', name: 'Farm Fresh Veggie Pizza', description: 'Loaded with bell peppers, mushrooms and olives.', price: 399, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pizzas', isVeg: true, rating: 4.5, popular: false },
    { id: 'f4_8', name: 'Tiramisu', description: 'Classic Italian dessert with espresso and mascarpone.', price: 199, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.7, popular: false },
    { id: 'f4_9', name: 'Cheese Stuffed Crust Pizza', description: 'Extra cheesy pizza with a stuffed crust.', price: 549, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Pizzas', isVeg: true, rating: 4.7, popular: true },
    { id: 'f4_10', name: 'Fresh Lemonade', description: 'Hand-squeezed lemonade with mint.', price: 89, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.4, popular: false },
  ]),

  // r5 — Burger Barn
  ...foodItems('r5', [
    { id: 'f5_1', name: 'Classic Beef Burger', description: 'Juicy beef patty with lettuce, tomato and pickles.', price: 299, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Burgers', isVeg: false, rating: 4.6, popular: true },
    { id: 'f5_2', name: 'Crispy Chicken Burger', description: 'Crunchy fried chicken with sriracha mayo.', price: 279, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Burgers', isVeg: false, rating: 4.7, popular: true },
    { id: 'f5_3', name: 'Veg Aloo Tikki Burger', description: 'Spiced potato patty with mint chutney.', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Burgers', isVeg: true, rating: 4.4, popular: false },
    { id: 'f5_4', name: 'Cheese Burger', description: 'Double cheese beef burger with caramelised onions.', price: 349, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Burgers', isVeg: false, rating: 4.7, popular: true },
    { id: 'f5_5', name: 'French Fries (Large)', description: 'Golden crispy fries with dipping sauce.', price: 129, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.5, popular: false },
    { id: 'f5_6', name: 'Chocolate Milkshake', description: 'Thick and creamy chocolate shake.', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.6, popular: false },
    { id: 'f5_7', name: 'Paneer Burger', description: 'Grilled paneer patty with tandoori spices.', price: 229, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Burgers', isVeg: true, rating: 4.5, popular: true },
    { id: 'f5_8', name: 'Onion Rings', description: 'Beer-battered crispy onion rings.', price: 109, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.4, popular: false },
    { id: 'f5_9', name: 'Spicy Chicken Wings (6 pcs)', description: 'Flame-tossed wings with hot sauce.', price: 299, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Starters', isVeg: false, rating: 4.6, popular: true },
    { id: 'f5_10', name: 'Coleslaw', description: 'Creamy coleslaw with cabbage and carrots.', price: 79, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.2, popular: false },
  ]),

  // r6 — Dessert Street
  ...foodItems('r6', [
    { id: 'f6_1', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten centre.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.8, popular: true },
    { id: 'f6_2', name: 'Waffle with Ice Cream', description: 'Fluffy waffle topped with 2 scoops of ice cream.', price: 229, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Waffles', isVeg: true, rating: 4.7, popular: true },
    { id: 'f6_3', name: 'Gulab Jamun (4 pcs)', description: 'Soft fried milk balls in rose sugar syrup.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Indian Sweets', isVeg: true, rating: 4.6, popular: false },
    { id: 'f6_4', name: 'Brownie Sundae', description: 'Fudgy brownie with vanilla ice cream and hot fudge.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Ice Cream', isVeg: true, rating: 4.7, popular: true },
    { id: 'f6_5', name: 'Cheesecake Slice', description: 'New York-style baked cheesecake with berry compote.', price: 179, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.8, popular: true },
    { id: 'f6_6', name: 'Kulfi Falooda', description: 'Traditional Indian ice cream with rose falooda.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Ice Cream', isVeg: true, rating: 4.6, popular: false },
    { id: 'f6_7', name: 'Rabri', description: 'Thickened sweetened milk with cardamom and saffron.', price: 119, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Indian Sweets', isVeg: true, rating: 4.5, popular: false },
    { id: 'f6_8', name: 'Tres Leches Cake', description: 'Soft sponge soaked in three milks, topped with cream.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.7, popular: false },
    { id: 'f6_9', name: 'Mango Sorbet', description: 'Refreshing mango sorbet, no dairy.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Ice Cream', isVeg: true, rating: 4.5, popular: false },
    { id: 'f6_10', name: 'Hot Chocolate', description: 'Rich velvety hot chocolate with whipped cream.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.6, popular: false },
  ]),

  // r7 — Biryani Blues
  ...foodItems('r7', [
    { id: 'f7_1', name: 'Hyderabadi Chicken Biryani', description: 'Dum-cooked biryani with saffron and fried onions.', price: 379, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Biryani', isVeg: false, rating: 4.8, popular: true },
    { id: 'f7_2', name: 'Veg Biryani', description: 'Fragrant basmati rice cooked with fresh vegetables.', price: 279, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Biryani', isVeg: true, rating: 4.5, popular: false },
    { id: 'f7_3', name: 'Mutton Biryani', description: 'Slow-cooked tender mutton biryani, Lucknawi style.', price: 449, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Biryani', isVeg: false, rating: 4.8, popular: true },
    { id: 'f7_4', name: 'Prawn Biryani', description: 'Juicy prawns layered with fragrant dum rice.', price: 499, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Biryani', isVeg: false, rating: 4.7, popular: true },
    { id: 'f7_5', name: 'Seekh Kebab (6 pcs)', description: 'Minced lamb kebabs grilled on skewers.', price: 329, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: false, rating: 4.7, popular: true },
    { id: 'f7_6', name: 'Hara Bhara Kebab', description: 'Green peas and spinach kebab, crispy outside.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.5, popular: false },
    { id: 'f7_7', name: 'Raita', description: 'Cooling yoghurt dip with cucumber and spices.', price: 69, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.4, popular: false },
    { id: 'f7_8', name: 'Phirni', description: 'Chilled rice pudding with cardamom and rose water.', price: 99, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.6, popular: false },
    { id: 'f7_9', name: 'Paneer Biryani', description: 'Cottage cheese and rice layered with whole spices.', price: 319, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Biryani', isVeg: true, rating: 4.6, popular: true },
    { id: 'f7_10', name: 'Shahi Tukda', description: 'Fried bread soaked in saffron milk and rabri.', price: 149, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.5, popular: false },
  ]),

  // r8 — Dosa Delight
  ...foodItems('r8', [
    { id: 'f8_1', name: 'Paper Dosa', description: 'Ultra-thin crispy dosa served with sambar.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.5, popular: true },
    { id: 'f8_2', name: 'Ghee Podi Dosa', description: 'Dosa smeared with ghee and spiced lentil powder.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.6, popular: true },
    { id: 'f8_3', name: 'Set Dosa (3 pcs)', description: 'Soft, spongy mini dosas with veg sagu.', price: 109, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.4, popular: false },
    { id: 'f8_4', name: 'Mysore Masala Dosa', description: 'Spicy red chutney dosa with potato masala.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.7, popular: true },
    { id: 'f8_5', name: 'Uttapam (Onion-Tomato)', description: 'Thick soft pancake topped with onion and tomato.', price: 119, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Uttapam', isVeg: true, rating: 4.4, popular: false },
    { id: 'f8_6', name: 'Mini Idli Sambar (12 pcs)', description: 'Bite-sized idlis dunked in spicy sambar.', price: 109, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Idli & Vada', isVeg: true, rating: 4.5, popular: true },
    { id: 'f8_7', name: 'Ragi Dosa', description: 'Healthy finger millet dosa, light and nutritious.', price: 139, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dosas', isVeg: true, rating: 4.4, popular: false },
    { id: 'f8_8', name: 'Vada Sambar (2 pcs)', description: 'Crispy lentil fritters soaked in sambar.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Idli & Vada', isVeg: true, rating: 4.4, popular: false },
    { id: 'f8_9', name: 'Kesari Bath', description: 'Sweet semolina pudding with cashews and raisins.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.5, popular: false },
    { id: 'f8_10', name: 'Butter Milk', description: 'Chilled spiced buttermilk with cumin and coriander.', price: 49, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.4, popular: false },
  ]),

  // r9 — The Noodle Bar
  ...foodItems('r9', [
    { id: 'f9_1', name: 'Ramen Bowl', description: 'Japanese-style ramen with soft-boiled egg.', price: 299, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.5, popular: true },
    { id: 'f9_2', name: 'Pad Thai', description: 'Thai stir-fried rice noodles with peanuts.', price: 279, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.4, popular: true },
    { id: 'f9_3', name: 'Dim Sum Basket (6 pcs)', description: 'Steamed dumplings with dipping sauce.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dim Sum', isVeg: false, rating: 4.5, popular: true },
    { id: 'f9_4', name: 'Veg Dumplings (6 pcs)', description: 'Steamed vegetable dumplings.', price: 169, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dim Sum', isVeg: true, rating: 4.4, popular: false },
    { id: 'f9_5', name: 'Thai Green Curry', description: 'Coconut green curry with vegetables.', price: 269, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Curries', isVeg: true, rating: 4.5, popular: false },
    { id: 'f9_6', name: 'Chicken Teriyaki', description: 'Grilled chicken in sweet teriyaki glaze.', price: 329, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.6, popular: true },
    { id: 'f9_7', name: 'Edamame', description: 'Steamed salted soybeans, the perfect starter.', price: 119, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: true, rating: 4.3, popular: false },
    { id: 'f9_8', name: 'Miso Soup', description: 'Warm Japanese miso with tofu and seaweed.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Soups', isVeg: true, rating: 4.4, popular: false },
    { id: 'f9_9', name: 'Udon Noodle Soup', description: 'Thick wheat noodles in umami dashi broth.', price: 259, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.4, popular: false },
    { id: 'f9_10', name: 'Green Tea Cheesecake', description: 'Matcha-flavoured cheesecake, light and creamy.', price: 179, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.6, popular: false },
  ]),

  // r10 — Mumbai Street Bites
  ...foodItems('r10', [
    { id: 'f10_1', name: 'Vada Pav', description: 'The Mumbai burger — spiced potato fritter in a bun.', price: 49, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Street Food', isVeg: true, rating: 4.7, popular: true },
    { id: 'f10_2', name: 'Pav Bhaji', description: 'Spiced vegetable mash served with buttered pav.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Street Food', isVeg: true, rating: 4.7, popular: true },
    { id: 'f10_3', name: 'Pani Puri (6 pcs)', description: 'Crispy puris filled with tangy tamarind water.', price: 79, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Chaat', isVeg: true, rating: 4.6, popular: true },
    { id: 'f10_4', name: 'Bhel Puri', description: 'Puffed rice with chutneys, onions and sev.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Chaat', isVeg: true, rating: 4.5, popular: false },
    { id: 'f10_5', name: 'Sev Puri', description: 'Flat puris topped with chutneys and sev.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Chaat', isVeg: true, rating: 4.5, popular: false },
    { id: 'f10_6', name: 'Dabeli', description: 'Kutchi sweet-spicy potato filling in a pav bun.', price: 69, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Street Food', isVeg: true, rating: 4.5, popular: true },
    { id: 'f10_7', name: 'Misal Pav', description: 'Spicy sprout curry served with pav bread.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Street Food', isVeg: true, rating: 4.6, popular: true },
    { id: 'f10_8', name: 'Ragda Pattice', description: 'White pea curry over potato patties.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Chaat', isVeg: true, rating: 4.5, popular: false },
    { id: 'f10_9', name: 'Cheese Vada Pav', description: 'Classic vada pav with melted cheese.', price: 79, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Street Food', isVeg: true, rating: 4.6, popular: false },
    { id: 'f10_10', name: 'Kokum Sharbat', description: 'Chilled sweet-sour kokum drink.', price: 59, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.5, popular: false },
  ]),

  // r11 — The Cake Factory
  ...foodItems('r11', [
    { id: 'f11_1', name: 'Red Velvet Cake Slice', description: 'Moist red velvet with cream cheese frosting.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.9, popular: true },
    { id: 'f11_2', name: 'Chocolate Truffle Cake Slice', description: 'Dark chocolate ganache layered cake.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.8, popular: true },
    { id: 'f11_3', name: 'Strawberry Pastry', description: 'Cream-filled pastry with fresh strawberry glaze.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Pastries', isVeg: true, rating: 4.7, popular: true },
    { id: 'f11_4', name: 'Croissant', description: 'Buttery, flaky French croissant.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Pastries', isVeg: true, rating: 4.6, popular: false },
    { id: 'f11_5', name: 'Black Forest Cake Slice', description: 'Chocolate sponge with cherries and cream.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.7, popular: true },
    { id: 'f11_6', name: 'Chocolate Chip Cookies (6 pcs)', description: 'Freshly baked gooey chocolate chip cookies.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cookies', isVeg: true, rating: 4.8, popular: true },
    { id: 'f11_7', name: 'Blueberry Cheesecake Slice', description: 'Creamy NY-style cheesecake with blueberry topping.', price: 219, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cakes', isVeg: true, rating: 4.9, popular: true },
    { id: 'f11_8', name: 'Eclair', description: 'Choux pastry filled with vanilla cream.', price: 89, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Pastries', isVeg: true, rating: 4.5, popular: false },
    { id: 'f11_9', name: 'Walnut Brownie', description: 'Dense fudgy brownie packed with walnuts.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Cookies', isVeg: true, rating: 4.7, popular: false },
    { id: 'f11_10', name: 'Cold Coffee', description: 'Chilled creamy coffee blended with milk.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.5, popular: false },
  ]),

  // r12 — Royal Curry House
  ...foodItems('r12', [
    { id: 'f12_1', name: 'Rogan Josh', description: 'Slow-cooked Kashmiri lamb in aromatic red gravy.', price: 399, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.6, popular: true },
    { id: 'f12_2', name: 'Murgh Makhani', description: 'Chicken in a silky smooth tomato-cream sauce.', price: 329, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.7, popular: true },
    { id: 'f12_3', name: 'Shahi Paneer', description: 'Paneer in a rich cashew and cream gravy.', price: 299, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.6, popular: true },
    { id: 'f12_4', name: 'Galouti Kebab', description: 'Melt-in-mouth minced lamb kebab with spices.', price: 349, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Starters', isVeg: false, rating: 4.7, popular: true },
    { id: 'f12_5', name: 'Laccha Paratha', description: 'Layered whole wheat flaky paratha.', price: 59, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Breads', isVeg: true, rating: 4.5, popular: false },
    { id: 'f12_6', name: 'Dal Tadka', description: 'Yellow lentils tempered with cumin and garlic.', price: 199, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.5, popular: false },
    { id: 'f12_7', name: 'Chicken Handi', description: 'Rustic curry cooked in a clay pot.', price: 359, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.6, popular: false },
    { id: 'f12_8', name: 'Steamed Rice', description: 'Fluffy long-grain steamed basmati rice.', price: 99, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.3, popular: false },
    { id: 'f12_9', name: 'Kheer', description: 'Rice pudding with cardamom and pistachios.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.5, popular: false },
    { id: 'f12_10', name: 'Kesar Lassi', description: 'Chilled saffron-flavoured sweet lassi.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.6, popular: false },
  ]),

  // r13 — Meenakshi South Kitchen
  ...foodItems('r13', [
    { id: 'f13_1', name: 'Full Meals (Thali)', description: 'Complete South Indian meal on a banana leaf.', price: 249, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Thalis', isVeg: true, rating: 4.7, popular: true },
    { id: 'f13_2', name: 'Sambar Rice', description: 'Rice mixed with tangy lentil sambar and ghee.', price: 149, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.5, popular: false },
    { id: 'f13_3', name: 'Curd Rice', description: 'Comfort food — yoghurt rice tempered with mustard.', price: 119, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.6, popular: true },
    { id: 'f13_4', name: 'Rasam', description: 'Thin tangy tomato and pepper soup.', price: 79, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Soups', isVeg: true, rating: 4.5, popular: false },
    { id: 'f13_5', name: 'Lemon Rice', description: 'Tangy lemon-turmeric rice with cashews.', price: 139, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.5, popular: false },
    { id: 'f13_6', name: 'Chicken Chettinad Curry', description: 'Fiery Chettinad chicken with fresh-ground spices.', price: 329, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.7, popular: true },
    { id: 'f13_7', name: 'Appam with Coconut Milk', description: 'Soft lacy rice pancake with sweetened coconut milk.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Breakfast', isVeg: true, rating: 4.6, popular: true },
    { id: 'f13_8', name: 'Payasam', description: 'South Indian rice pudding with jaggery.', price: 99, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.6, popular: false },
    { id: 'f13_9', name: 'Coconut Chutney (extra)', description: 'Fresh coconut chutney with green chilli.', price: 29, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.4, popular: false },
    { id: 'f13_10', name: 'Fresh Coconut Water', description: 'Chilled tender coconut water, naturally sweet.', price: 69, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.6, popular: false },
  ]),

  // r14 — Dragon Palace
  ...foodItems('r14', [
    { id: 'f14_1', name: 'Kung Pao Chicken', description: 'Spicy Sichuan chicken with peanuts.', price: 329, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.4, popular: true },
    { id: 'f14_2', name: 'Mapo Tofu', description: 'Silken tofu in spicy bean paste sauce.', price: 249, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: true, rating: 4.3, popular: false },
    { id: 'f14_3', name: 'Peking Duck', description: 'Crispy roast duck served with pancakes.', price: 599, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.5, popular: true },
    { id: 'f14_4', name: 'Prawn Har Gow', description: 'Steamed crystal prawn dumplings.', price: 299, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Dim Sum', isVeg: false, rating: 4.5, popular: true },
    { id: 'f14_5', name: 'Dan Dan Noodles', description: 'Spicy Sichuan noodles with pork mince.', price: 279, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Noodles', isVeg: false, rating: 4.4, popular: false },
    { id: 'f14_6', name: 'Veg Fried Rice', description: 'Egg-fried rice with seasonal vegetables.', price: 199, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: true, rating: 4.2, popular: false },
    { id: 'f14_7', name: 'Sweet & Sour Pork', description: 'Crispy pork in a vibrant sweet & sour sauce.', price: 349, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Main Course', isVeg: false, rating: 4.3, popular: false },
    { id: 'f14_8', name: 'Egg Fried Rice', description: 'Classic wok-tossed egg fried rice.', price: 179, image: 'https://images.unsplash.com/photo-1565299507177-9be9b819fcb4?w=400&q=80', category: 'Rice', isVeg: false, rating: 4.3, popular: false },
    { id: 'f14_9', name: 'Hot & Sour Soup', description: 'Thick spicy soup with mushrooms and vinegar.', price: 149, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Soups', isVeg: true, rating: 4.2, popular: false },
    { id: 'f14_10', name: 'Mango Pudding', description: 'Chilled silky mango pudding.', price: 129, image: 'https://images.unsplash.com/photo-1565299624280-43431e19582c?w=400&q=80', category: 'Desserts', isVeg: true, rating: 4.4, popular: false },
  ]),

  // r15 — Wraps & Rolls
  ...foodItems('r15', [
    { id: 'f15_1', name: 'Chicken Kathi Roll', description: 'Flaky paratha wrapped with tandoori chicken.', price: 169, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Rolls', isVeg: false, rating: 4.5, popular: true },
    { id: 'f15_2', name: 'Paneer Kathi Roll', description: 'Spiced paneer and peppers in a paratha wrap.', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Rolls', isVeg: true, rating: 4.5, popular: true },
    { id: 'f15_3', name: 'Egg Kathi Roll', description: 'Omelette-wrapped paratha roll.', price: 129, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Rolls', isVeg: false, rating: 4.4, popular: false },
    { id: 'f15_4', name: 'Veg Frankie', description: 'Spiced vegetable filling in a soft wrap.', price: 109, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Wraps', isVeg: true, rating: 4.3, popular: false },
    { id: 'f15_5', name: 'BBQ Chicken Wrap', description: 'Smoky BBQ chicken with coleslaw in a tortilla.', price: 189, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Wraps', isVeg: false, rating: 4.5, popular: true },
    { id: 'f15_6', name: 'Falafel Wrap', description: 'Crispy falafel with hummus and veggies.', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Wraps', isVeg: true, rating: 4.4, popular: false },
    { id: 'f15_7', name: 'Double Egg Frankie', description: 'Two-egg omelette wrap with green chutney.', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Wraps', isVeg: false, rating: 4.4, popular: false },
    { id: 'f15_8', name: 'Schezwan Chicken Roll', description: 'Spicy Schezwan chicken in a crispy roll.', price: 189, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Rolls', isVeg: false, rating: 4.5, popular: true },
    { id: 'f15_9', name: 'Cheese Fries', description: 'Crispy fries loaded with cheddar cheese sauce.', price: 129, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Sides', isVeg: true, rating: 4.4, popular: false },
    { id: 'f15_10', name: 'Cold Coffee', description: 'Chilled creamy blended coffee.', price: 99, image: 'https://images.unsplash.com/photo-1568901346375-96f3d9c3f8b1?w=400&q=80', category: 'Beverages', isVeg: true, rating: 4.3, popular: false },
  ]),
];
