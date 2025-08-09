'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Calendar, Lock, Sparkles, Star } from 'lucide-react'
import { Restaurant, MenuItem } from '@/lib/dummyData'
import MenuItemCard from './MenuItemCard'
import Cart from './Cart'
import ReservationForm from './ReservationForm'
import PremiumModal from './PremiumModal'

interface MenuPageProps {
  restaurant: Restaurant
  onBack: () => void
  tableNumber?: number
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function MenuPage({ restaurant, onBack, tableNumber }: MenuPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showReservation, setShowReservation] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [selectedPremiumItem, setSelectedPremiumItem] = useState<MenuItem | null>(null)

  const addToCart = (item: MenuItem) => {
    if (item.isPremium) {
      setSelectedPremiumItem(item)
      setShowPremiumModal(true)
      return
    }

    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prev.filter(item => item.id !== itemId)
    })
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 glass-effect backdrop-blur-lg p-4"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{restaurant.name}</h1>
            {tableNumber && (
              <p className="text-white/70 text-sm">Table {tableNumber}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!tableNumber && (
              <button
                onClick={() => setShowReservation(true)}
                className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Calendar className="w-6 h-6 text-white" />
              </button>
            )}
            
            <button
              onClick={() => setShowCart(true)}
              className="relative glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {getCartItemsCount() > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-xs font-bold text-white px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center"
                  style={{ backgroundColor: restaurant.themeColor }}
                >
                  {getCartItemsCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Restaurant Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-40 overflow-hidden"
      >
        <img
          src={restaurant.logo}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${restaurant.themeColor}40)` 
          }}
        />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{restaurant.name}</h2>
              <p className="text-white/80">{restaurant.cuisine} • 25-30 min</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
              </div>
              <p className="text-sm text-white/70">2.1 km away</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="p-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Our Menu</h3>
          <p className="text-white/70">Discover our delicious offerings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurant.menu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <MenuItemCard
                item={item}
                onAddToCart={addToCart}
                themeColor={restaurant.themeColor}
                cartQuantity={cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                onRemoveFromCart={removeFromCart}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Summary */}
      <AnimatePresence>
        {getCartItemsCount() > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 z-30"
          >
            <div 
              className="glass-effect rounded-lg p-4 cursor-pointer"
              onClick={() => setShowCart(true)}
              style={{ borderColor: restaurant.themeColor + '40' }}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">{getCartItemsCount()} items</div>
                    <div className="text-sm text-white/70">Tap to review order</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">₹{getTotalAmount()}</div>
                  <div className="text-sm text-white/70">View Cart →</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showCart && (
          <Cart
            items={cartItems}
            restaurant={restaurant}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={(itemId, newQuantity) => {
              if (newQuantity === 0) {
                removeFromCart(itemId)
              } else {
                setCartItems(prev =>
                  prev.map(item =>
                    item.id === itemId
                      ? { ...item, quantity: newQuantity }
                      : item
                  )
                )
              }
            }}
          />
        )}

        {showReservation && (
          <ReservationForm
            restaurant={restaurant}
            onClose={() => setShowReservation(false)}
            preOrderItems={cartItems}
          />
        )}

        {showPremiumModal && selectedPremiumItem && (
          <PremiumModal
            item={selectedPremiumItem}
            onClose={() => {
              setShowPremiumModal(false)
              setSelectedPremiumItem(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}