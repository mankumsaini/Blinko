# ⚡ Blinko – Quick-Commerce & Food Delivery Website

> **Tagline:** Everything you need, delivered with ease.

Blinko is a modern, responsive, commercial-grade quick-commerce and food delivery platform inspired by services such as Blinkit and Zomato. It features grocery shopping, hot meal delivery from local restaurants, household essentials, live GPS order tracking, a full administrative analytics dashboard, and a dedicated integration hook for **SupportRoot AI**.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router v7, Lucide React Icons, Axios
- **Backend:** Python, Django 6, Django REST Framework (DRF), `django-cors-headers`, SQLite
- **AI Support Integration:** SupportRoot AI Client Bridge & Webhook

---

## 🚀 Quick Start Guide

Follow these steps to run both the Django backend and the React frontend on your machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Python** (v3.10 or higher)

---

### Step 1: Setup & Start the Django Backend

Open a terminal in the project root directory (`d:\blinko`):

```powershell
# Set a local Django secret key for this terminal session (do not commit it)
$env:DJANGO_SECRET_KEY = python -c "import secrets; print(secrets.token_urlsafe(50))"

# 1. Install backend Python dependencies
python -m pip install -r backend/requirements.txt

# 2. Apply database migrations (SQLite)
python backend/manage.py migrate

# 3. (Optional) Re-seed fictional sample products, restaurants, and orders
python backend/seed_data.py

# 4. Start the Django development server on port 8000
python backend/manage.py runserver 127.0.0.1:8000
```

The Django API will be live at: **[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)**

---

### Step 2: Setup & Start the React Frontend

Open a second terminal in the project root directory (`d:\blinko`):

```powershell
# 1. Install frontend node dependencies (if not already installed)
npm install

# 2. Start the Vite development server
npm run dev
```

Open your browser and navigate to: **[http://localhost:5174/](http://localhost:5174/)** (or `http://localhost:5173/`).

---

## 📍 Website Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Homepage** | Hero promotional banners, service pillar entries, top products & restaurants |
| `/daily` | **Blinko Daily** | 50 grocery items across 7 categories with + / - quantity steppers and filters |
| `/eats` | **Blinko Eats** | 15 partner restaurants across 8 cuisines with ratings and delivery fees |
| `/restaurant/:id`| **Restaurant Detail** | Full restaurant menu with 150 dishes, Veg/Non-Veg toggles, and add to cart |
| `/essentials` | **Blinko Essentials**| 30 household utility products at wholesale rates |
| `/checkout` | **Checkout** | Delivery address selector, delivery instructions, and payment simulation |
| `/order-confirmation/:id` | **Confirmation** | Instant order placement confirmation with reference code and arrival estimates |
| `/order-tracking/:id` | **Live Tracking** | Live milestone progress (`Confirmed` → `Out for Delivery` → `Delivered`), driver card, cancellation |
| `/account` | **Customer Account** | Profile details, saved addresses, order history, and refund claims |
| `/help` | **Help Center** | 8 categories with 32+ searchable FAQs and support ticket generator |
| `/admin` | **Admin Dashboard** | Historical analytics (2021–2026), revenue metrics, charts, and live order status management |
| `/supportroot-tests` | **SupportRoot AI Test Lab** | Interactive QA test bench with 30 evaluation scenarios (tracking, refunds, cancellations, security) |
| `/about` | **About Blinko** | Corporate vision and fictional 2021–2026 milestone history |
| `/how-it-works` | **How It Works** | 90-second dark store packing and electric EV fleet delivery mechanics |
| `/careers` | **Careers** | Open job opportunities with application modal |
| `/contact` | **Contact Us** | Headquarters, regional offices (Bangalore, Mumbai, Delhi), and inquiry form |
| `/policies` | **Legal Policies** | Cancellation & Refund, Shipping & Delivery, Privacy, and Terms & Conditions |

---

## 🤖 SupportRoot AI Integration

Blinko is pre-engineered with a dedicated integration point for the **SupportRoot AI** platform:

1. **Floating Widget:** Located in the bottom-right corner of every page (`src/components/support/SupportWidget.tsx`).
2. **Central Configuration File:** Located at `src/config/supportConfig.ts`:
   ```ts
   export const SUPPORT_CONFIG = {
     enabled: true,
     widgetUrl: '',  // Enter your external SupportRoot AI widget script URL here
     apiKey: '',     // Enter your SupportRoot AI API key here
     position: 'bottom-right',
     companyName: 'Blinko',
     primaryColor: '#FF6B00',
   };
   ```
3. **Execution Modes:**
   - **External Embed Mode:** If `widgetUrl` is provided, Blinko dynamically injects the external script or iframe.
   - **Bridge Mode:** Pre-connected to the Django backend status endpoint:
     - `GET http://localhost:8000/api/support/supportroot/status/`
     - `POST http://localhost:8000/api/support/supportroot/webhook/`
   - **Interactive Fallback:** Supports instant sample inquiries like *"Track my order BLK-892401"*, *"Request refund for damaged perishables"*, or custom natural language chat.

---

## 📂 Project Directory Structure

```
d:\blinko\
├── backend\                     # Django REST Framework Backend
│   ├── blinko_core\             # Project configuration (settings, urls, wsgi)
│   ├── apps\
│   │   ├── products\            # Grocery & Essentials models, views, serializers
│   │   ├── restaurants\         # Restaurants & food menus models and views
│   │   ├── orders\              # Cart, Checkout, Cancellation, and Refund endpoints
│   │   ├── accounts\            # Customer profile and address endpoints
│   │   ├── analytics\           # Operations dashboard metrics & 2021–2026 statistics
│   │   └── support\             # Support tickets & SupportRoot AI webhook/bridge
│   ├── seed_data.py             # Database population script (loads 50 groceries, 30 essentials, 15 restaurants)
│   ├── db.sqlite3               # Local SQLite database (created by migrations; not committed)
│   └── requirements.txt         # Python dependencies
│
├── src\                         # React 19 Frontend
│   ├── api\                     # Axios client with automated Django / offline fallback
│   ├── components\
│   │   ├── layout\              # Navbar, Footer, LocationModal
│   │   ├── common\              # ProductCard, RestaurantCard
│   │   ├── cart\                # CartDrawer with quantity steppers & promo codes
│   │   ├── auth\                # AuthModal (1-Click Demo Login & Registration)
│   │   └── support\             # SupportWidget (Dedicated SupportRoot AI integration)
│   ├── config\                  # supportConfig.ts
│   ├── data\                    # groceryProducts.ts, restaurants.ts, essentialsProducts.ts, faqs.ts
│   ├── pages\                   # HomePage, DailyPage, EatsPage, EssentialsPage, Checkout, Tracking, etc.
│   ├── store\                   # AuthContext, CartContext, WishlistContext
│   ├── types\                   # TypeScript interfaces (Product, Restaurant, Order, etc.)
│   ├── App.tsx                  # Global Router & Providers
│   └── main.tsx
├── package.json
└── README.md
```

---

## 🔒 Demonstration Data Notice

Blinko is a fictional quick-commerce showcase project inspired by commercial platforms like Blinkit and Zomato. All corporate history (2021–2026), analytics figures, order records, customer reviews, delivery partners, and payment processing are simulated demonstration data designed for presentation and software testing.
