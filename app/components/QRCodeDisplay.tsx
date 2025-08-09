'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Download, QrCode } from 'lucide-react'

interface QRCodeDisplayProps {
  restaurant: {
    name: string
    tables: number
    themeColor: string
  }
  onClose: () => void
}

export default function QRCodeDisplay({ restaurant, onClose }: QRCodeDisplayProps) {
  const [qrCodes, setQRCodes] = useState<Array<{ table: number; url: string; qrDataUrl: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateQRCodes()
  }, [])

  const generateQRCodes = async () => {
    const codes = []
    
    for (let table = 1; table <= restaurant.tables; table++) {
      const tableUrl = `${window.location.origin}/restaurant/fastrestaurant?table=${table}`
      
      // Create a simple QR code placeholder (in real app, use qrcode package)
      const qrDataUrl = `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <rect x="20" y="20" width="160" height="160" fill="black" rx="8"/>
          <rect x="40" y="40" width="120" height="120" fill="white" rx="4"/>
          <text x="100" y="110" text-anchor="middle" font-size="14" font-family="Arial" fill="black">
            TABLE ${table}
          </text>
          <text x="100" y="130" text-anchor="middle" font-size="10" font-family="Arial" fill="black">
            ${restaurant.name}
          </text>
        </svg>
      `)}`
      
      codes.push({
        table,
        url: tableUrl,
        qrDataUrl
      })
    }
    
    setQRCodes(codes)
    setLoading(false)
  }

  const downloadQRCode = (table: number, dataUrl: string) => {
    const link = document.createElement('a')
    link.download = `${restaurant.name}-Table-${table}-QR.svg`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAllQRCodes = () => {
    qrCodes.forEach(({ table, qrDataUrl }) => {
      setTimeout(() => downloadQRCode(table, qrDataUrl), table * 100)
    })
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div className="glass-effect rounded-2xl p-8 text-center">
          <QrCode className="w-12 h-12 text-white/60 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Generating QR codes...</p>
        </div>
      </motion.div>
    )
  }

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
        className="glass-effect rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-4 text-white flex items-center justify-between"
          style={{ backgroundColor: restaurant.themeColor + '20' }}
        >
          <div>
            <h3 className="text-xl font-bold">QR Codes for {restaurant.name}</h3>
            <p className="text-white/80 text-sm">{restaurant.tables} tables generated</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadAllQRCodes}
              className="glass-effect px-3 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
            <button
              onClick={onClose}
              className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* QR Code Grid */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {qrCodes.map(({ table, url, qrDataUrl }) => (
              <motion.div
                key={table}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: table * 0.05 }}
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="mb-3">
                  <img
                    src={qrDataUrl}
                    alt={`QR Code for Table ${table}`}
                    className="w-32 h-32 mx-auto rounded-lg bg-white"
                  />
                </div>
                
                <h4 className="text-white font-bold mb-1">Table {table}</h4>
                <p className="text-white/60 text-xs mb-3 break-all">{url}</p>
                
                <button
                  onClick={() => downloadQRCode(table, qrDataUrl)}
                  className="w-full px-3 py-2 text-sm rounded-lg glass-effect hover:bg-white/20 transition-colors text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 border-t border-white/10">
          <div className="text-white/70 text-sm">
            <p className="mb-2"><strong className="text-white">Instructions:</strong></p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Download and print each QR code</li>
              <li>Place them on corresponding tables</li>
              <li>Customers can scan to access the menu for that specific table</li>
              <li>Orders will be automatically linked to the table number</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}