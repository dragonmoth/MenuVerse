'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  QrCode, 
  Plus, 
  Settings, 
  Users, 
  TrendingUp, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';

interface MenuItemForm {
  name: string;
  description: string;
  price: string;
  image: string;
  isPremium: boolean;
}

type TabId = 'overview' | 'menu' | 'qr' | 'settings';

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showQRCodes, setShowQRCodes] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: 'My Restaurant',
    cuisine: 'Multi-Cuisine',
    themeColor: '#FF6B35',
    tables: 10,
    logo: ''
  });
  const [menuItems, setMenuItems] = useState<MenuItemForm[]>([]);
  const [newMenuItem, setNewMenuItem] = useState<MenuItemForm>({
    name: '',
    description: '',
    price: '',
    image: '',
    isPremium: false
  });

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMenuItem.name && newMenuItem.price) {
      setMenuItems(prev => [...prev, newMenuItem]);
      setNewMenuItem({
        name: '',
        description: '',
        price: '',
        image: '',
        isPremium: false
      });
    }
  };

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'menu', label: 'Menu', icon: Plus },
    { id: 'qr', label: 'QR Codes', icon: QrCode },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-effect backdrop-blur-lg p-4 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">{restaurantData.name}</h1>
              <p className="text-white/70 text-sm">Restaurant Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-effect px-3 py-1 rounded-lg">
              <span className="text-white/70 text-sm">Tables: </span>
              <span className="text-white font-semibold">{restaurantData.tables}</span>
            </div>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: restaurantData.themeColor }}
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-white/70 glass-effect hover:bg-white/20'
                }`}
                style={activeTab === tab.id ? { backgroundColor: restaurantData.themeColor } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-effect rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">42</div>
                      <div className="text-white/70 text-sm">Today's Reservations</div>
                    </div>
                  </div>
                </div>
                <div className="glass-effect rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">₹12,450</div>
                      <div className="text-white/70 text-sm">Today's Revenue</div>
                    </div>
                  </div>
                </div>
                <div className="glass-effect rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">18 min</div>
                      <div className="text-white/70 text-sm">Avg Prep Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New reservation', time: '2 min ago', details: 'Table 5 • 4 guests • 7:30 PM' },
                    { action: 'Order completed', time: '5 min ago', details: 'Table 3 • ₹850' },
                    { action: 'New reservation', time: '12 min ago', details: 'Table 8 • 2 guests • 8:00 PM' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                      <div>
                        <div className="text-white font-medium text-sm">{activity.action}</div>
                        <div className="text-white/60 text-xs">{activity.details}</div>
                      </div>
                      <div className="text-white/60 text-xs">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Add New Item Form */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Add Menu Item</h3>
                <form onSubmit={handleAddMenuItem} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Item Name *</label>
                      <input
                        type="text"
                        required
                        value={newMenuItem.name}
                        onChange={e => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="e.g., Chicken Biryani"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newMenuItem.price}
                        onChange={e => setNewMenuItem(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="299"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Description</label>
                    <textarea
                      value={newMenuItem.description}
                      onChange={e => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none"
                      rows={3}
                      placeholder="Describe your delicious dish..."
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Image URL</label>
                    <input
                      type="url"
                      value={newMenuItem.image}
                      onChange={e => setNewMenuItem(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={newMenuItem.isPremium}
                      onChange={e => setNewMenuItem(prev => ({ ...prev, isPremium: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isPremium" className="text-white/80 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      Premium item (AR/VR preview)
                    </label>
                  </div>
                  <button type="submit" className="button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Menu Item
                  </button>
                </form>
              </div>

              {/* Current Menu Items */}
              {menuItems.length > 0 && (
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Your Menu ({menuItems.length} items)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems.map((item, index) => (
                      <div key={index} className="glass-effect rounded-lg p-4 flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                            <Store className="w-6 h-6 text-white/40" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-white/60 text-sm">₹{item.price}</p>
                          {item.isPremium && (
                            <div className="text-yellow-400 text-xs flex items-center gap-1 mt-1">
                              <Sparkles className="w-3 h-3" />
                              Premium
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* QR Tab */}
          {activeTab === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Table QR Codes</h3>
                <p className="text-white/70 mb-6">
                  Generate unique QR codes for each table in your restaurant
                </p>
                <button
                  onClick={() => setShowQRCodes(true)}
                  className="button-primary"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Codes for {restaurantData.tables} Tables
                </button>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Restaurant Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Restaurant Name</label>
                      <input
                        type="text"
                        value={restaurantData.name}
                        onChange={e => setRestaurantData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Cuisine Type</label>
                      <input
                        type="text"
                        value={restaurantData.cuisine}
                        onChange={e => setRestaurantData(prev => ({ ...prev, cuisine: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCodes && (
          <QRCodeDisplay
            restaurant={restaurantData}
            onClose={() => setShowQRCodes(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
