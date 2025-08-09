'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Star, Clock } from 'lucide-react'
import { dummyRestaurants } from '@/lib/dummyData'
import RestaurantCard from './RestaurantCard'
import MenuPage from './MenuPage'

export default function RestaurantList() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)

  const nextRestaurant = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyRestaurants.length)
  }

  const prevRestaurant = () => {
    setCurrentIndex((prev) => (prev - 1 + dummyRestaurants.length) % dummyRestaurants.length)
  }

  const handleRestaurantSelect = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId)
  }

  if (selectedRestaurant) {
    const restaurant = dummyRestaurants.find(r => r.id === selectedRestaurant)
    if (restaurant) {
      return (
        <MenuPage 
          restaurant={restaurant} 
          onBack={() => setSelectedRestaurant(null)}
        />
      )
    }
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Discover Amazing Restaurants
        </h1>
        <p className="text-white/70 mb-4">Swipe to explore different cuisines</p>
        
        <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Mumbai, India</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Open Now</span>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevRestaurant}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass-effect p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextRestaurant}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass-effect p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Restaurant Cards */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {dummyRestaurants.map((restaurant, index) => (
              <div key={restaurant.id} className="w-full flex-shrink-0 px-8">
                <RestaurantCard
                  restaurant={restaurant}
                  onSelect={handleRestaurantSelect}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {dummyRestaurants.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 max-w-2xl mx-auto grid grid-cols-3 gap-4"
      >
        <div className="glass-effect p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">4.8</div>
          <div className="text-white/70 text-sm flex items-center justify-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            Rating
          </div>
        </div>
        <div className="glass-effect p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">15min</div>
          <div className="text-white/70 text-sm">Avg Delivery</div>
        </div>
        <div className="glass-effect p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{dummyRestaurants.length}</div>
          <div className="text-white/70 text-sm">Restaurants</div>
        </div>
      </motion.div>
    </div>
  )
}