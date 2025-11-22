import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Calendar } from 'lucide-react'
import { useState } from 'react'

export default function TradingRules() {
  const [generalRules, setGeneralRules] = useState(true)
  const [advancedOrders, setAdvancedOrders] = useState(true)
  const [breachAccount, setBreachAccount] = useState(true)
  const [deletePending, setDeletePending] = useState(true)
  const [marketTiming, setMarketTiming] = useState(50)
  const [activeTab, setActiveTab] = useState('NSE')
  const [activeQtyTab, setActiveQtyTab] = useState('NSE')

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Trading Rules</h1>
      </div>

      {/* General Rules */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm sm:text-base font-semibold text-gray-900">General Rules</div>
            <Switch checked={generalRules} onCheckedChange={setGeneralRules} />
          </div>

          {/* Market timing */}
          <div className="mb-6">
            <div className="text-sm text-gray-700 mb-3">Market timing</div>
            <div className="mb-2">
              <Slider value={[marketTiming]} onValueChange={(value) => setMarketTiming(value[0])} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>9:30 AM</span>
              <span>3:30 PM</span>
            </div>
          </div>

          {/* Advanced orders */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm font-medium text-gray-900">Advanced orders</div>
                <div className="text-xs text-gray-500">Enable advanced orders</div>
              </div>
              <Switch checked={advancedOrders} onCheckedChange={setAdvancedOrders} />
            </div>
          </div>

          {/* Auto-square off time & Trading mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Auto-square off time</label>
              <div className="relative">
                <Input type="text" value="3:30 PM" className="pr-10 text-sm" readOnly />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Trading mode</label>
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Demo</option>
                <option>Live</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Margin & Exposure */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Margin & Exposure</div>

          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
            <button
              onClick={() => setActiveTab('NSE')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeTab === 'NSE'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              NSE
            </button>
            <button
              onClick={() => setActiveTab('MCX')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeTab === 'MCX'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              MCX
            </button>
            <button
              onClick={() => setActiveTab('Forex')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeTab === 'Forex'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Forex
            </button>
          </div>

          {/* Margin & Exposure Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Margin</label>
              <Input type="text" placeholder="10%" className="text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Exposure</label>
              <Input type="text" placeholder="$23,0000" className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantity and Position limit */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Quantity and Position limit</div>

          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
            <button
              onClick={() => setActiveQtyTab('NSE')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeQtyTab === 'NSE'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              NSE
            </button>
            <button
              onClick={() => setActiveQtyTab('MCX')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeQtyTab === 'MCX'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              MCX
            </button>
            <button
              onClick={() => setActiveQtyTab('Forex')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${
                activeQtyTab === 'Forex'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Forex
            </button>
          </div>

          {/* Quantity Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Min Qty</label>
              <Input type="text" placeholder="$43,000" className="text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Max Qty</label>
              <Input type="text" placeholder="$32,000" className="text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Total Limit</label>
              <Input type="text" placeholder="$23,0000" className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk management */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Risk management</div>

          {/* Max Daily loss limit */}
          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2 block">Max Daily loss limit</label>
            <Input type="text" placeholder="$43,000" className="text-sm" />
          </div>

          {/* Breach account */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm font-medium text-gray-900">Breach account</div>
                <div className="text-xs text-gray-500">Auto-freeze on breach account</div>
              </div>
              <Switch checked={breachAccount} onCheckedChange={setBreachAccount} />
            </div>
          </div>

          {/* Delete pending orders */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm font-medium text-gray-900">Delete pending orders</div>
                <div className="text-xs text-gray-500">Auto-delete pending order (EOD)</div>
              </div>
              <Switch checked={deletePending} onCheckedChange={setDeletePending} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market permission */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Market permission</div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" defaultChecked />
              NSE
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" defaultChecked />
              MCX
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              Crypto
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}