import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { DollarSign, Banknote, Wallet, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import AddFundsModal from './AddFundsModal'

export default function ClientDetailsModal({ open, onOpenChange, client }) {
  const [showAddFunds, setShowAddFunds] = useState(false)

  if (!client) return null

  const pnlData = [
    { month: '10', value: 50 },
    { month: '11', value: 110 },
    { month: '12', value: 80 },
    { month: '13', value: 120 },
    { month: '14', value: 140 },
    { month: '15', value: 40 },
    { month: '16', value: 60 },
    { month: '17', value: 180 },
    { month: '18', value: 200 },
    { month: '19', value: 220 },
    { month: '20', value: 100 },
    { month: '21', value: 260 },
    { month: '22', value: 0 },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[340px] p-0">
          {/* Header */}
          <div className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Client's Details</h2>
              <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            
            {/* Profile */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden mb-3">
                <img
                  src="https://ui-avatars.com/api/?name=Amit+Sharma&background=4a5568&color=fff"
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{client.name}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>ID:{client.id}</span>
                <span>|</span>
                <span>Date joined: 23-09-2025</span>
                <span>|</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign size={14} className="text-green-500" />
              </div>
              <div className="text-lg font-semibold text-gray-900">$400k</div>
              <div className="text-xs text-gray-500">Available Balance</div>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <Banknote size={14} className="text-green-500" />
              </div>
              <div className="text-lg font-semibold text-gray-900">$50k</div>
              <div className="text-xs text-gray-500">Margin used</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Wallet size={14} className="text-green-500" />
              </div>
              <div className="text-lg font-semibold text-gray-900">$120k</div>
              <div className="text-xs text-gray-500">Total Balance</div>
            </div>
          </div>

          {/* Trading permissions */}
          <div className="px-6 py-3 border-b">
            <div className="text-xs text-gray-500 mb-2">Trading permissions</div>
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
              <div>
                <div className="text-sm font-medium text-gray-900">NSE, Forex, MCX</div>
                <div className="text-xs text-gray-500">Allowed market</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Percentage */}
          <div className="px-6 py-3 border-b">
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
              <div>
                <div className="text-sm font-medium text-gray-900">% Percentage</div>
                <div className="text-xs text-gray-500">Commission profit share</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Order quantity */}
          <div className="px-6 py-3 border-b">
            <div className="text-xs text-gray-500 mb-2">Order quantity per segment</div>
            <div className="flex gap-2 mb-3">
              <button className="px-3 py-1.5 text-xs bg-green-500 text-white rounded">Equity</button>
              <button className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded">Future</button>
              <button className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded">Commodity</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Min order quantity</div>
                <div className="h-8 border border-gray-200 rounded"></div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Max order quantity</div>
                <div className="h-8 border border-gray-200 rounded"></div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Total position limit</div>
                <div className="h-8 border border-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Margin setups */}
          <div className="px-6 py-3 border-b">
            <div className="text-xs text-gray-500 mb-2">Default margin setups</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Intra day (%)</div>
                <div className="h-8 border border-gray-200 rounded"></div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Holding (%)</div>
                <div className="h-8 border border-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* P&L Overview */}
          <div className="px-6 py-4 border-b">
            <div className="text-xs text-gray-500 mb-3">P&L Overview</div>
            <div className="text-xs text-gray-500 mb-2">September</div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pnlData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    ticks={[0, 50, 100, 150, 200, 250, 300]}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#22c55e"
                    radius={[2, 2, 0, 0]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 grid grid-cols-3 gap-2">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white text-xs h-9"
            >
              Froze account
            </Button>
            <Button 
              variant="outline" 
              className="text-gray-700 text-xs h-9 border-gray-300"
            >
              Reset password
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white text-xs h-9"
              onClick={() => setShowAddFunds(true)}
            >
              + Add funds
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddFundsModal 
        open={showAddFunds} 
        onOpenChange={setShowAddFunds}
        client={client}
      />
    </>
  )
}
