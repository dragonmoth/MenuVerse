'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D, Box } from '@react-three/drei'
import { HelpCircle, X, ChevronRight } from 'lucide-react'
import * as THREE from 'three'

// Simple 3D Waiter Model (placeholder)
function WaiterModel() {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 1.2]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.6, 0.8, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.6, 0.8, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Hat */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

export default function WaiterGuide() {
  const [showGuide, setShowGuide] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [showModel, setShowModel] = useState(false)

  const tips = [
    {
      title: "Welcome to Menuverse!",
      content: "I'm your virtual waiter. Let me help you navigate through our amazing restaurants!",
      action: "Get Started"
    },
    {
      title: "Choose Your Restaurant",
      content: "Swipe through our curated list of restaurants. Each offers unique cuisines and experiences!",
      action: "Next Tip"
    },
    {
      title: "Explore the Menu",
      content: "Tap any restaurant to view their menu. Premium items offer AR/VR previews!",
      action: "Next Tip"
    },
    {
      title: "Make Reservations",
      content: "Book your table in advance and even pre-order your favorite dishes!",
      action: "Next Tip"
    },
    {
      title: "QR Code Ordering",
      content: "At the restaurant? Scan the QR code on your table to order directly to the kitchen!",
      action: "Start Exploring"
    }
  ]

  const nextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(prev => prev + 1)
    } else {
      setShowGuide(false)
      setCurrentTip(0)
    }
  }

  useEffect(() => {
    // Show guide after a short delay
    const timer = setTimeout(() => {
      setShowModel(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 3D Waiter Model */}
      <AnimatePresence>
        {showModel && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 100, y: 100 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="fixed bottom-4 right-4 z-40 waiter-guide"
          >
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGuide(true)}
                className="w-20 h-20 rounded-full glass-effect hover:bg-white/20 transition-all duration-300 overflow-hidden"
              >
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[2, 2, 2]} intensity={0.8} />
                  <WaiterModel />
                </Canvas>
              </motion.button>
              
              {/* Help indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <HelpCircle className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="glass-effect rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 3D Waiter Header */}
              <div className="h-32 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
                <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
                  <ambientLight intensity={0.8} />
                  <pointLight position={[2, 2, 2]} intensity={1} />
                  <WaiterModel />
                </Canvas>
                
                <button
                  onClick={() => setShowGuide(false)}
                  className="absolute top-4 right-4 glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Tip Content */}
              <div className="p-6">
                <motion.div
                  key={currentTip}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {tips[currentTip].title}
                  </h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {tips[currentTip].content}
                  </p>
                </motion.div>

                {/* Progress Indicator */}
                <div className="flex gap-2 mb-6">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        index <= currentTip ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">
                    {currentTip + 1} of {tips.length}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextTip}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
                  >
                    {tips[currentTip].action}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}