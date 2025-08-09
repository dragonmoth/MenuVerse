'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, Users, Clock, CreditCard, CheckCircle, Phone } from 'lucide-react'
import { Restaurant, MenuItem, mockReservations } from '@/lib/dummyData'

interface CartItem extends MenuItem {
  quantity: number
}

interface ReservationFormProps {
  restaurant: Restaurant
  onClose: () => void
  preOrderItems?: CartItem[]
}

export default function ReservationForm({ restaurant, onClose, preOrderItems = [] }: ReservationFormProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tablePreference: 'any',
    includePreOrder: preOrderItems.length > 0
  })

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
    '8:30 PM', '9:00 PM', '9:30 PM'
  ]

  const tablePreferences = [
    { value: 'any', label: 'Any Available' },
    { value: 'window', label: 'Window Seat' },
    { value: 'corner', label: 'Corner Table' },
    { value: 'center', label: 'Center Area' }
  ]

  const getPreOrderTotal = () => {
    return preOrderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getReservationFee = () => {
    return Math.floor(Math.random() * 11) + 10 // ₹10-₹20
  }

  const getTotalAmount = () => {
    let total = getReservationFee()
    if (formData.includePreOrder) {
      total += getPreOrderTotal()
    }
    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      const reservation = {
        id: `res_${Date.now()}`,
        restaurantId: restaurant.id,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        tablePreference: formData.tablePreference,
        preOrder: formData.includePreOrder ? preOrderItems : [],
        totalAmount: getTotalAmount(),
        status: 'confirmed' as const
      }
      
      mockReservations.push(reservation)
      setStep('success')
    }, 2000)
  }

  const handleSuccess = () => {
    // Simulate WhatsApp/SMS notification
    alert(`WhatsApp notification sent to ${formData.phone}\nReservation confirmed for ${formData.date} at ${formData.time}`)
    onClose()
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
        className="glass-effect rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'form' && (
          <>
            <div 
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: restaurant.themeColor + '20' }}
            >
              <div>
                <h3 className="text-xl font-bold">Reserve Table</h3>
                <p className="text-white/80 text-sm">{restaurant.name}</p>
              </div>
              <button
                onClick={onClose}
                className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Guests *</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num} className="bg-gray-800">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Preferred Time *</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, time }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.time === time
                          ? 'text-white'
                          : 'text-white/70 glass-effect hover:bg-white/20'
                      }`}
                      style={formData.time === time ? { backgroundColor: restaurant.themeColor } : {}}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Table Preference</label>
                <select
                  value={formData.tablePreference}
                  onChange={(e) => setFormData(prev => ({ ...prev, tablePreference: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                >
                  {tablePreferences.map(pref => (
                    <option key={pref.value} value={pref.value} className="bg-gray-800">{pref.label}</option>
                  ))}
                </select>
              </div>

              {preOrderItems.length > 0 && (
                <div className="glass-effect rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/80 text-sm font-medium">Include Pre-order</label>
                    <input
                      type="checkbox"
                      checked={formData.includePreOrder}
                      onChange={(e) => setFormData(prev => ({ ...prev, includePreOrder: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  {formData.includePreOrder && (
                    <div className="text-white/70 text-xs">
                      {preOrderItems.length} items • ₹{getPreOrderTotal()}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <div className="flex justify-between text-white/70 text-sm mb-2">
                  <span>Reservation Fee</span>
                  <span>₹{getReservationFee()}</span>
                </div>
                {formData.includePreOrder && (
                  <div className="flex justify-between text-white/70 text-sm mb-2">
                    <span>Pre-order Total</span>
                    <span>₹{getPreOrderTotal()}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold">
                  <span>Total Amount</span>
                  <span>₹{getTotalAmount()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.phone || !formData.date || !formData.time}
                className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <div 
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: restaurant.themeColor + '20' }}
            >
              <div>
                <h3 className="text-xl font-bold">Payment</h3>
                <p className="text-white/80 text-sm">Secure payment via Razorpay</p>
              </div>
              <button
                onClick={() => setStep('form')}
                className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="glass-effect rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Reservation Summary</h4>
                <div className="space-y-1 text-sm text-white/70">
                  <div>Date: {formData.date}</div>
                  <div>Time: {formData.time}</div>
                  <div>Guests: {formData.guests}</div>
                  <div>Table: {tablePreferences.find(p => p.value === formData.tablePreference)?.label}</div>
                </div>
              </div>

              <div className="glass-effect rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Reservation Fee</span>
                    <span>₹{getReservationFee()}</span>
                  </div>
                  {formData.includePreOrder && (
                    <div className="flex justify-between text-white/70">
                      <span>Pre-order ({preOrderItems.length} items)</span>
                      <span>₹{getPreOrderTotal()}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>₹{getTotalAmount()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <CreditCard className="w-5 h-5" />
                Pay ₹{getTotalAmount()} with Razorpay
              </motion.button>

              <p className="text-white/60 text-xs text-center">
                Test mode - No real payment will be charged
              </p>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <div 
              className="p-4 text-white text-center"
              style={{ backgroundColor: restaurant.themeColor + '20' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Reservation Confirmed!</h3>
              <p className="text-white/80">Your table has been reserved</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="glass-effect rounded-lg p-4 text-center">
                <h4 className="text-white font-semibold mb-3">Reservation Details</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{formData.guests} guests</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>SMS sent to {formData.phone}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSuccess}
                className="w-full button-primary"
              >
                Continue Shopping
              </motion.button>

              <p className="text-white/60 text-xs text-center">
                You will receive a confirmation WhatsApp message shortly
              </p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}