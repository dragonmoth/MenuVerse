'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { QrCode, MapPin, Clock } from 'lucide-react'
import { dummyRestaurants } from '@/lib/dummyData'
import MenuPage from '@/app/components/MenuPage'
import Link from 'next/link'

interface PageProps {
  params: { id: string }
}

export default function RestaurantTablePage({ params }: PageProps) {
  const searchParams = useSearchParams()
  const tableNumber = searchParams.get('table')
  const restaurant = dummyRestaurants.find(r => r.id === params.id)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-8 text-center max-w-md"
        >
          <QrCode className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Restaurant Not Found</h2>
          <p className="text-white/70 mb-6">The restaurant you're looking for doesn't exist.</p>
          <Link href="/" className="button-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  if (tableNumber) {
    return (
      <div>
        {/* Table Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-4 text-center"
          style={{ backgroundColor: restaurant.themeColor + '20' }}
        >
          <div className="flex items-center justify-center gap-4 text-white">
            <QrCode className="w-5 h-5" />
            <span className="font-semibold">Table {tableNumber} • {restaurant.name}</span>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" />
              <span>Scan time: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>
        
        <MenuPage 
          restaurant={restaurant} 
          tableNumber={parseInt(tableNumber)}
          onBack={() => window.history.back()}
        />
      </div>
    )
  }

  return (
    <MenuPage 
      restaurant={restaurant} 
      onBack={() => window.history.back()}
    />
  )
}