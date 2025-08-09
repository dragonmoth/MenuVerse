'use client'

import { motion } from 'framer-motion'
import { X, Sparkles, Eye, Camera, Package } from 'lucide-react'
import { MenuItem } from '@/lib/dummyData'

interface PremiumModalProps {
  item: MenuItem
  onClose: () => void
}

export default function PremiumModal({ item, onClose }: PremiumModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-2xl w-full max-w-lg overflow-hidden border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Premium Experience</h3>
          <p className="text-white/80">Coming Soon in Menuverse Premium</p>
        </div>

        {/* Item Details */}
        <div className="px-6">
          <div className="glass-effect rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-white font-semibold text-lg">{item.name}</h4>
                <p className="text-white/70 text-sm mb-1">{item.description}</p>
                <div className="text-yellow-400 font-bold">₹{item.price}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="px-6 pb-6">
          <h4 className="text-white font-semibold mb-4">What you'll get with Premium:</h4>
          
          <div className="space-y-3 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 text-white/90"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">AR Menu Preview</div>
                <div className="text-sm text-white/60">See exactly how your dish will look</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 text-white/90"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">Portion Size Visualization</div>
                <div className="text-sm text-white/60">Interactive 3D portion preview</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 text-white/90"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">Ingredient Breakdown</div>
                <div className="text-sm text-white/60">Detailed nutritional information</div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg shadow-lg mb-3"
            >
              Get Premium Access
            </motion.button>
            
            <p className="text-white/60 text-xs">
              Premium features launching soon. Stay tuned!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}