'use client'

import { motion } from 'framer-motion'
import { Star, Clock, MapPin, Users } from 'lucide-react'
import { Restaurant } from '@/lib/dummyData'

interface RestaurantCardProps {
  restaurant: Restaurant
  onSelect: (restaurantId: string) => void
  isActive: boolean
}

export default function RestaurantCard({ restaurant, onSelect, isActive }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-2xl overflow-hidden card-hover cursor-pointer"
      onClick={() => onSelect(restaurant.id)}
      style={{ borderColor: restaurant.themeColor + '40' }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.logo}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          style={{ 
            background: `linear-gradient(to top, ${restaurant.themeColor}80, transparent)` 
          }}
        />
        
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 premium-badge px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-white">AR/VR Ready</span>
        </div>
        
        {/* Rating */}
        <div className="absolute top-4 left-4 glass-effect px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-semibold">4.8</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{restaurant.name}</h3>
            <p className="text-white/70">{restaurant.cuisine} Cuisine</p>
          </div>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: restaurant.themeColor }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4" />
            <span>25-30 min</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4" />
            <span>2.1 km away</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Users className="w-4 h-4" />
            <span>{restaurant.tables} tables</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span>₹</span>
            <span>₹200 for two</span>
          </div>
        </div>

        {/* Menu Preview */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2">Popular Items</h4>
          <div className="flex gap-2 overflow-x-auto">
            {restaurant.menu.slice(0, 3).map((item) => (
              <div key={item.id} className="flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {item.isPremium && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 premium-badge rounded-full flex items-center justify-center">
                    <span className="text-xs">★</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300"
          style={{ 
            background: `linear-gradient(135deg, ${restaurant.themeColor}, ${restaurant.themeColor}CC)`,
            boxShadow: `0 4px 20px ${restaurant.themeColor}40`
          }}
        >
          View Menu & Reserve
        </motion.button>
      </div>
    </motion.div>
  )
}