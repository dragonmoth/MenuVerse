'use client'

import { motion } from 'framer-motion'
import { Plus, Minus, Lock, Sparkles } from 'lucide-react'
import { MenuItem } from '@/lib/dummyData'

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string) => void
  themeColor: string
  cartQuantity: number
}

export default function MenuItemCard({ 
  item, 
  onAddToCart, 
  onRemoveFromCart, 
  themeColor, 
  cartQuantity 
}: MenuItemCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-effect rounded-xl overflow-hidden card-hover"
      style={{ borderColor: themeColor + '30' }}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
        
        {item.isPremium && (
          <div className="absolute top-2 right-2 premium-badge px-2 py-1 rounded-lg flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span className="text-xs font-bold">Premium</span>
          </div>
        )}

        {/* Quick Add Button for non-premium items */}
        {!item.isPremium && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(item)}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: themeColor }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-white text-lg">{item.name}</h4>
          <div className="text-right">
            <div className="font-bold text-white">₹{item.price}</div>
            {item.isPremium && (
              <div className="text-yellow-400 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AR/VR
              </div>
            )}
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Quantity Controls or Add Button */}
        {cartQuantity > 0 && !item.isPremium ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemoveFromCart(item.id)}
                className="w-8 h-8 rounded-full glass-effect flex items-center justify-center hover:bg-white/20"
              >
                <Minus className="w-4 h-4 text-white" />
              </motion.button>
              
              <span className="text-white font-semibold text-lg min-w-8 text-center">
                {cartQuantity}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAddToCart(item)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: themeColor }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="text-white/70 text-sm">
              ₹{item.price * cartQuantity}
            </div>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(item)}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              item.isPremium 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400' 
                : ''
            }`}
            style={item.isPremium ? {} : { 
              backgroundColor: themeColor,
              boxShadow: `0 4px 15px ${themeColor}40`
            }}
          >
            {item.isPremium ? (
              <>
                <Lock className="w-4 h-4" />
                Preview with AR/VR
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}