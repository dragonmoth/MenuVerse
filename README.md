# Menuverse MVP - Claude Build Instructions

## Tech Stack & Dependencies
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (Prisma later, mock data now)
- Vercel (deployment)
- Framer Motion (smooth swiping/scroll animations)
- React Three Fiber + Drei (3D waiter model)
- qrcode npm package (QR code generation)
- Google Auth (NextAuth.js) for customers
- Razorpay test mode (for MVP payment simulation)

---

## Core Features

### 1️⃣ Role Selection / Login
- Full-screen role selector on site load.
- **Customer** → Login with Google or continue as guest.
- **Restaurant** → Login to dashboard or create new restaurant profile.
- Smooth Framer Motion animations.

---

### 2️⃣ Customer Flow

#### Restaurant List
- 5 dummy restaurants (including `"FastRestaurant"`) preloaded.
- Swipe horizontally (Framer Motion) between restaurants.
- Clicking restaurant → view menu.

#### Menu Page
- Grid layout of menu items.
- Normal items → Add to Cart.
- Premium items → Lock icon + “Coming Soon” modal.
- Floating Cart with live total.

#### Reservation System
- Modal form:
  - Time slot picker (Zomato-style).
  - Table preference.
  - Optional pre-order.
  - ₹10–₹20 payment (Razorpay test mode).
- On success:
  - Confirmation screen.
  - Simulate WhatsApp/SMS notification (no PDF).
  - Store reservation in mock DB (in-memory).

#### Dine-in QR Flow
- QR links to `/restaurant/[id]?table=X`.
- Menu pre-loaded for that table.

---

### 3️⃣ Restaurant Flow

#### Dashboard
- Form: name, cuisine, theme color, number of tables, logo upload.
- Menu creation form.
- “Generate QR Codes” → unique QR per table, downloadable.

#### Dummy Restaurant
- `"FastRestaurant"` preloaded for demo.
- Allow creation of new restaurants.

---

### 4️⃣ Premium Module
- `/premium` page.
- AR/VR placeholder with “Coming Soon” text.

---

### 5️⃣ 3D Waiter Guide
- Chibi waiter model (React Three Fiber + Drei).
- Bottom-right position.
- Guided tooltips:
  1. Choose restaurant.
  2. Reserve/order.
  3. Checkout.
- Use free `.glb` placeholder model from Sketchfab.

---

### 6️⃣ Components
- `RoleSelector.tsx`
- `RestaurantCard.tsx`
- `MenuItemCard.tsx`
- `Cart.tsx`
- `ReservationForm.tsx`
- `QRCodeDisplay.tsx`
- `WaiterGuide.tsx`

---

### 7️⃣ Data
- `/lib/dummyData.ts`:
  - Restaurants: `id`, `name`, `cuisine`, `themeColor`, `tables`, `logo`, `menu`.
  - Menu items: `id`, `name`, `description`, `price`, `image`, `isPremium`.

---

### 8️⃣ Payment
- Razorpay test mode.
- Reservation payment → “Reservation Confirmed”.
- Store in local JSON/mock DB.

---

### 9️⃣ Animations
- Framer Motion for swipe, fade, slide.
- 3D waiter idle bounce.

---

## File-by-File Instructions

### `/app/layout.tsx`
Wraps children in `<html>` and `<body>`, imports `globals.css`, sets basic body styles.

### `/app/page.tsx`
Role selector with Framer Motion animations.

### `/lib/dummyData.ts`
5 dummy restaurants, each with menus.

### `/app/components/RoleSelector.tsx`
Full-screen role chooser.

### `/app/components/RestaurantCard.tsx`
Card for restaurant list.

### `/app/components/MenuItemCard.tsx`
Menu card with premium lock if `isPremium`.

### `/app/components/Cart.tsx`
Floating cart with quantity controls.

### `/app/components/ReservationForm.tsx`
Modal for booking + pre-order.

### `/app/components/QRCodeDisplay.tsx`
QR grid display.

### `/app/components/WaiterGuide.tsx`
3D model loader with helper text.

---

**Claude:** Generate full working MVP based on above specs.
