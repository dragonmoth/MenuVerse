'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RoleSelector from './components/RoleSelector'
import RestaurantList from './components/RestaurantList'
import RestaurantDashboard from './components/RestaurantDashboard.tsx'
import WaiterGuide from './components/WaiterGuide'

export default function Home() {
  const [userRole, setUserRole] = useState<'customer' | 'restaurant' | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleRoleSelect = (role: 'customer' | 'restaurant') => {
    setUserRole(role)
    if (role === 'customer') {
      setIsLoggedIn(true) // Simulate login for demo
    }
  }

  const handleRestaurantLogin = () => {
    setIsLoggedIn(true)
  }

  if (!userRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />
  }

  if (userRole === 'customer') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <RestaurantList />
        <WaiterGuide />
      </motion.div>
    )
  }

  if (userRole === 'restaurant') {
    if (!isLoggedIn) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <div className="glass-effect p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Restaurant Login</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Restaurant Email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                onClick={handleRestaurantLogin}
                className="w-full button-primary"
              >
                Login to Dashboard
              </button>
              <button
                className="w-full button-secondary"
              >
                Create New Restaurant
              </button>
              <button
                onClick={() => setUserRole(null)}
                className="w-full text-white/60 hover:text-white transition-colors"
              >
                ← Back to Role Selection
              </button>
            </div>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <RestaurantDashboard />
      </motion.div>
    )
  }

  return null
}