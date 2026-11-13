import type { FAQItem } from '../types';

export const FAQS: FAQItem[] = [
  // ── Orders and Delivery ──────────────────────────────────────────────
  {
    id: 'faq-1',
    category: 'orders',
    question: 'How fast does Blinko deliver grocery items?',
    answer: 'Blinko Daily delivers within 10 to 15 minutes in supported metro zones, powered by our dense network of micro-fulfillment dark stores located within a 2-3 km radius of your address.'
  },
  {
    id: 'faq-2',
    category: 'orders',
    question: 'Can I track my delivery partner in real-time?',
    answer: 'Yes! Once your order is dispatched, you can view live GPS tracking with estimated arrival time, partner contact number, and step-by-step milestone updates on the Order Tracking page.'
  },
  {
    id: 'faq-3',
    category: 'orders',
    question: 'What happens if my order is delayed beyond the estimated time?',
    answer: 'If severe weather, traffic, or sudden surge causes a delay past the guaranteed window, Blinko automatically credits a ₹50 Blinko Cash apology compensation to your wallet.'
  },
  {
    id: 'faq-4',
    category: 'orders',
    question: 'Is there a minimum order value for free delivery?',
    answer: 'Orders above ₹199 qualify for free delivery across Blinko Daily and Essentials. For smaller orders, a nominal delivery fee of ₹15 to ₹25 applies.'
  },
  {
    id: 'faq-5',
    category: 'orders',
    question: 'Can I change my delivery address after placing an order?',
    answer: 'Because picking starts within 60 seconds of order placement, address changes can only be accommodated if the new location is within the exact same micro-warehouse zone. Please use the Help Center or contact support immediately.'
  },

  // ── Payments and Refunds ─────────────────────────────────────────────
  {
    id: 'faq-6',
    category: 'payments',
    question: 'Which payment methods are accepted on Blinko?',
    answer: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, CRED), Credit/Debit cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and Cash on Delivery (COD).'
  },
  {
    id: 'faq-7',
    category: 'payments',
    question: 'How long do refunds take to reflect in my bank account?',
    answer: 'UPI refunds are credited instantly within 15 minutes. Debit and credit card refunds take 2-4 business days depending on your issuing bank. Blinko Wallet refunds are immediate.'
  },
  {
    id: 'faq-8',
    category: 'payments',
    question: 'What should I do if money was deducted but order status shows failed?',
    answer: 'Don\'t worry! Banking payment gateways automatically reconcile uncaptured transactions within 24 hours. If it does not auto-refund, share the UTR reference number in our Help Center for instant credit.'
  },
  {
    id: 'faq-9',
    category: 'payments',
    question: 'Are there any hidden platform fees or packing charges?',
    answer: 'Blinko believes in 100% transparent billing. We display a clear breakdown before you click Pay: Item Total, Delivery Fee, and a nominal ₹3 eco-friendly handling charge.'
  },

  // ── Product Information ──────────────────────────────────────────────
  {
    id: 'faq-10',
    category: 'product',
    question: 'How does Blinko guarantee the freshness of vegetables and dairy?',
    answer: 'Our produce is farm-procured every night at 2:00 AM, undergoes triple-stage ozone sanitization and chilled cold-chain transport (2°C-4°C) directly to your local dark store by 5:30 AM.'
  },
  {
    id: 'faq-11',
    category: 'product',
    question: 'Where can I find expiration dates and manufacturing info?',
    answer: 'Every grocery item on Blinko displays guaranteed minimum shelf life (e.g. "Min 4 days before expiry"). The exact batch number and expiration date are stamped clearly on product packaging.'
  },
  {
    id: 'faq-12',
    category: 'product',
    question: 'What if an item is out of stock after I placed the order?',
    answer: 'Our inventory syncs in real time with 99.8% accuracy. In the rare event of damage during packing, you are notified via SMS and instantly refunded for the unavailable item before dispatch.'
  },
  {
    id: 'faq-13',
    category: 'product',
    question: 'Are organic fruits and vegetables certified?',
    answer: 'Yes, all produce tagged with the "Organic" badge comes from Jaivik Bharat and NPOP certified farms with verifiable traceability codes.'
  },

  // ── Account and Login ────────────────────────────────────────────────
  {
    id: 'faq-14',
    category: 'account',
    question: 'Do I need an account to place an order?',
    answer: 'You can browse products and add items to your cart freely. At checkout, a simple one-click phone number verification or email login is required to secure delivery coordinates.'
  },
  {
    id: 'faq-15',
    category: 'account',
    question: 'How can I manage multiple delivery addresses?',
    answer: 'Go to "Account" > "Saved Addresses". You can add, label (Home, Work, Parents), edit pincodes, and set a primary default address for one-tap checkout.'
  },
  {
    id: 'faq-16',
    category: 'account',
    question: 'How do I delete or update my account information?',
    answer: 'You can update your name, email, and phone directly under Account Settings. For account deletion under data privacy regulations, tap "Privacy Settings" > "Request Data Deletion".'
  },
  {
    id: 'faq-17',
    category: 'account',
    question: 'Can I share my Blinko cart with family members?',
    answer: 'Yes! Blinko Family Cart lets you share a live cart link with roommates or family members so everyone can add their favorite snacks before checkout.'
  },

  // ── Cancellations ────────────────────────────────────────────────────
  {
    id: 'faq-18',
    category: 'cancellations',
    question: 'Can I cancel an order after placing it?',
    answer: 'You can cancel free of charge within 60 seconds of placing the order from the Order Tracking screen. Once packing begins, cancellation may incur a restocking fee.'
  },
  {
    id: 'faq-19',
    category: 'cancellations',
    question: 'Can I cancel a restaurant food order once the kitchen starts cooking?',
    answer: 'Once a restaurant accepts and begins preparing your hot meal, food cannot be re-sold, so cancellation is restricted. If there is an extraordinary issue, reach out through SupportRoot AI.'
  },
  {
    id: 'faq-20',
    category: 'cancellations',
    question: 'Why was my order cancelled automatically by Blinko?',
    answer: 'Automatic cancellations rarely occur, usually due to sudden severe weather road closures or store safety lockdowns. If this happens, a full refund is immediately credited.'
  },

  // ── Returns and Replacements ─────────────────────────────────────────
  {
    id: 'faq-21',
    category: 'returns',
    question: 'What is Blinko\'s return policy for spoiled or damaged groceries?',
    answer: 'We have a "No Questions Asked" replacement or refund policy for perishable goods. Simply snap a photo in the Help Center within 24 hours of delivery to initiate an immediate refund.'
  },
  {
    id: 'faq-22',
    category: 'returns',
    question: 'Can household essentials from Blinko Essentials be returned?',
    answer: 'Non-perishable items like kitchen utilities, storage boxes, and stationery can be returned within 7 days in their original packaging with intact seals.'
  },
  {
    id: 'faq-23',
    category: 'returns',
    question: 'Does the delivery partner inspect returned goods at doorstep?',
    answer: 'For household essentials, our rider will verify the original packaging and serial/barcode during pickup. For groceries, no physical pickup is required.'
  },

  // ── Restaurant Orders ────────────────────────────────────────────────
  {
    id: 'faq-24',
    category: 'restaurant',
    question: 'How does Blinko ensure restaurant food stays piping hot?',
    answer: 'All Blinko Eats delivery partners carry thermal-insulated delivery bags equipped with temperature-retention heating elements, ensuring steam-hot food within 30-45 minutes.'
  },
  {
    id: 'faq-25',
    category: 'restaurant',
    question: 'Can I provide cooking instructions or allergen notices to the restaurant?',
    answer: 'Yes! On the checkout page under "Cooking Instructions", you can specify spice levels, request "no onions/garlic", or list allergies like peanuts and lactose.'
  },
  {
    id: 'faq-26',
    category: 'restaurant',
    question: 'Are prices on Blinko Eats the same as the restaurant dining menu?',
    answer: 'We partner directly with restaurateurs to provide transparent pricing along with exclusive platform discounts, free dessert combos, and 1+1 offers.'
  },
  {
    id: 'faq-27',
    category: 'restaurant',
    question: 'What if an item is missing from my food delivery?',
    answer: 'If an item is missing from your sealed tamper-evident food bag, click "Report Issue" in your order details for an immediate partial refund or express dispatch of the missing dish.'
  },

  // ── General Queries ──────────────────────────────────────────────────
  {
    id: 'faq-28',
    category: 'general',
    question: 'In which cities is Blinko currently available?',
    answer: 'Blinko currently operates across Bangalore, Mumbai, Delhi-NCR, Hyderabad, Pune, Chennai, Kolkata, and Ahmedabad, with 250+ active fulfillment centers.'
  },
  {
    id: 'faq-29',
    category: 'general',
    question: 'What are Blinko\'s operating hours?',
    answer: 'Blinko operates from 6:00 AM to 2:00 AM daily. Select express hubs in Bangalore and Mumbai operate 24/7 for late-night snacks and medicine essentials.'
  },
  {
    id: 'faq-30',
    category: 'general',
    question: 'What is SupportRoot AI and how does it assist me?',
    answer: 'SupportRoot AI is our next-generation customer intelligence platform integrated directly into Blinko. It provides instantaneous order tracking, self-serve refund processing, and answers inquiries 24/7 in natural language.'
  },
  {
    id: 'faq-31',
    category: 'general',
    question: 'How can I become a Blinko merchant or delivery partner?',
    answer: 'Visit our Careers or Partner onboarding page, or email partner@blinko.demo to register your dark store or restaurant kitchen.'
  },
  {
    id: 'faq-32',
    category: 'general',
    question: 'Is Blinko eco-friendly in its packaging and delivery fleet?',
    answer: 'Yes! Over 65% of our delivery fleet consists of electric two-wheelers (EVs), and all orders are packed in biodegradable paper bags or reusable cloth totes.'
  }
];
