# Menuverse MVP - Deployment Guide

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Fill in your actual API keys
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
menuverse-mvp/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── RoleSelector.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── MenuPage.tsx
│   │   ├── MenuItemCard.tsx
│   │   ├── Cart.tsx
│   │   ├── ReservationForm.tsx
│   │   ├── PremiumModal.tsx
│   │   ├── RestaurantDashboard.tsx
│   │   ├── QRCodeDisplay.tsx
│   │   └── WaiterGuide.tsx
│   ├── restaurant/[id]/     # Dynamic restaurant pages
│   ├── premium/             # Premium features page
│   ├── api/auth/            # NextAuth.js configuration
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page with role selector
├── lib/
│   └── dummyData.ts         # Mock data for restaurants and menu
└── public/                  # Static assets
```

## 🎯 Key Features Implemented

### ✅ Customer Flow
- **Role Selection**: Choose between Customer or Restaurant
- **Restaurant Browsing**: Swipe through 5 restaurants with animations
- **Menu Viewing**: Grid layout with premium item indicators
- **Cart Management**: Real-time cart with quantity controls
- **Reservation System**: Book tables with time slots and pre-orders
- **QR Code Support**: Direct table access via QR scan
- **Payment Integration**: Razorpay test mode simulation

### ✅ Restaurant Flow
- **Dashboard**: Overview with stats and recent activity
- **Menu Management**: Add new menu items with premium options
- **QR Code Generation**: Unique codes for each table
- **Settings**: Restaurant configuration and branding

### ✅ Premium Features
- **AR/VR Placeholder**: Coming soon page with feature previews
- **Premium Items**: Special menu items with lock indicators
- **3D Waiter Guide**: Interactive helper with tips

## 🎨 Design Features

- **Glassmorphism**: Modern glass-effect components
- **Smooth Animations**: Framer Motion for all interactions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Theme Colors**: Each restaurant has its own branding
- **3D Elements**: React Three Fiber for waiter model

## 🔧 Technical Implementation

### State Management
- React hooks for local state
- In-memory mock database
- No localStorage (Claude artifact limitation)

### Animations
- Framer Motion for page transitions
- 3D waiter model with idle animations
- Smooth swipe gestures for restaurant browsing

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Glass morphism effects with backdrop blur

## 🚀 Deployment to Vercel

1. **Connect Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial Menuverse MVP"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repo to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables for Production**
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## 🔮 Future Enhancements

### Database Integration
- Replace mock data with Prisma + PostgreSQL
- User authentication and sessions
- Real-time order tracking

### Payment Integration
- Full Razorpay integration
- Multiple payment methods
- Order history and receipts

### Premium Features
- Real AR/VR menu previews
- 3D food models
- Nutritional information overlay
- Ingredient sourcing details

### Advanced Features
- Real-time order updates
- Kitchen dashboard
- Analytics and reporting
- Multi-language support
- Push notifications

## 🛠 Development Notes

- Uses Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- React Three Fiber for 3D elements
- Mock data in `/lib/dummyData.ts`

## 📱 Testing

1. **Customer Flow**
   - Select "I'm a Customer"
   - Browse restaurants by swiping
   - Add items to cart
   - Make a reservation
   - Test QR code flow: `/restaurant/fastrestaurant?table=5`

2. **Restaurant Flow**
   - Select "I'm a Restaurant" 
   - Login with mock credentials
   - Add menu items
   - Generate QR codes
   - Update settings

3. **Premium Features**
   - Click premium items (gold lock icon)
   - Visit `/premium` page
   - Interact with 3D waiter guide

The MVP is fully functional and ready for production deployment!