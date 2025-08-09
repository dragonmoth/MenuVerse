'use client'

import { motion } from 'framer-motion'
import { Users, Store, Sparkles } from 'lucide-react'

interface RoleSelectorProps {
  onRoleSelect: (role: 'customer' | 'restaurant') => void
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent">Menuverse</span>
          </h1>
          <p className="text-white/80 text-lg mb-8">Smart restaurant ordering with AR/VR experiences</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRoleSelect('customer')}
            className="glass-effect p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
          >
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-2">I'm a Customer</h3>
            <p className="text-white/70">Browse restaurants, reserve tables, and order food</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRoleSelect('restaurant')}
            className="glass-effect p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
          >
            <Store className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-2">I'm a Restaurant</h3>
            <p className="text-white/70">Manage menu, tables, and generate QR codes</p>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-white/60 text-sm"
        >
          <p>Experience the future of dining with AR/VR menu previews</p>
        </motion.div>
      </motion.div>
    </div>
  )
}