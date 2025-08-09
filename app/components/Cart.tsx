'use client'

import { motion } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'
import { Restaurant, MenuItem } from '@/lib/dummyData'

interface CartItem extends MenuItem {
  quantity: number
}

interface CartProps {
  items: CartItem[]
  restaurant: Restaurant
  onClose: () => void
  onUpdateQuantity: (itemId: string, newQuantity: number) => void
}

export default function Cart({ items, restaurant, onClose, onUpdateQuantity }: CartProps) {
  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const handleCheckout = () => {
    // Simulate payment processing
    alert(`Order placed successfully! Total: ₹${getTotalAmount()}`)
    onClose()
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="glass-effect rounded-2xl p-8 max-w-md w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <ShoppingBag className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
          <p className="text-white/70 mb-6">Add some delicious items to get started</p>
          <button
            onClick={onClose}
            className="button-primary"
          >
            Continue Shopping
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="glass-effect rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-4 text-white flex items-center justify-between"
          style={{ backgroundColor: restaurant.themeColor + '20' }}
        >
          <div>
            <h3 className="text-xl font-bold">Your Order</h3>
            <p className="text-white/80 text-sm">{restaurant.name}</p>
          </div>
          <button
            onClick={onClose}
            className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="glass-effect rounded-lg p-3 flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                <p className="text-white/70 text-xs">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full glass-effect flex items-center justify-center hover:bg-white/20"
                >
                  <Minus className="w-3 h-3 text-white" />
                </motion.button>
                
                <span className="text-white font-semibold min-w-6 text-center">
                  {item.quantity}
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: restaurant.themeColor }}
                >
                  <Plus className="w-3 h-3" />
                </motion.button>
              </div>

              <div className="text-white font-semibold min-w-16 text-right">
                ₹{item.price * item.quantity}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary & Checkout */}
        <div className="p-4 border-t border-white/10">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-white/70 text-sm">
              <span>Subtotal ({getItemsCount()} items)</span>
              <span>₹{getTotalAmount()}</span>
            </div>
            <div className="flex justify-between text-white/70 text-sm">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div className="flex justify-between text-white/70 text-sm">
              <span>Taxes & Fees</span>
              <span>₹{Math.round(getTotalAmount() * 0.05)}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span>₹{getTotalAmount() + 40 + Math.round(getTotalAmount() * 0.05)}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
            style={{ 
              background: `linear-gradient(135deg, ${restaurant.themeColor}, ${restaurant.themeColor}CC)`,
              boxShadow: `0 4px 20px ${restaurant.themeColor}40`
            }}
          >
            <CreditCard className="w-5 h-5" />
            Proceed to Payment
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}