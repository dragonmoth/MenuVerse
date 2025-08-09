'use client'

import { motion } from 'framer-motion'
import { Sparkles, Eye, Camera, Package, ArrowLeft, Zap, Star } from 'lucide-react'
import Link from 'next/link'

export default function PremiumPage() {
  const features = [
    {
      icon: Eye,
      title: "AR Menu Preview",
      description: "See exactly how your dish will look before ordering with augmented reality",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Package,
      title: "3D Portion Visualization",
      description: "Interactive 3D models showing exact portion sizes and presentation",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Camera,
      title: "Ingredient Breakdown",
      description: "Detailed nutritional information and ingredient sourcing with AR overlay",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "VR Dining Experience",
      description: "Virtual reality preview of the restaurant ambiance and your table setting",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Menuverse <span className="bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the future of dining with AR/VR technology. See, feel, and explore your food before you order.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
              <p className="text-white/70 mb-6">
                We're working hard to bring you the most immersive dining experience ever created.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg shadow-lg"
              >
                Notify Me When Ready
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Premium Features</h2>
          <p className="text-white/70 text-lg">Revolutionary technology meets culinary excellence</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
                
                <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Premium Feature</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Demo Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">See It In Action</h3>
            <div className="relative max-w-2xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center border-2 border-dashed border-white/30">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">Demo Video Coming Soon</p>
                  <p className="text-white/40 text-sm">AR/VR menu preview demonstration</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Be the First to Experience Premium</h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Join our exclusive beta program and get early access to AR/VR dining features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg shadow-lg"
              >
                Join Beta Program
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 glass-effect text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 