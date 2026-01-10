import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Calendar, Loader2, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { tradingApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function TradingRules() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // General Rules
  const [generalRules, setGeneralRules] = useState({
    enabled: true,
    advancedOrders: true,
    tradingMode: 'Demo',
    autoSquareOffTime: '15:30'
  })

  // Market timing slider (percentage of day)
  const [marketTiming, setMarketTiming] = useState(50)

  // Risk Management
  const [riskManagement, setRiskManagement] = useState({
    maxDailyLossLimit: 0,
    breachAccountAutoFreeze: true,
    deletePendingOrdersEOD: true
  })

  // Market Permissions
  const [marketPermissions, setMarketPermissions] = useState({
    NSE: true,
    MCX: true,
    Forex: false,
    Crypto: false
  })

  // Segment Settings
  const [segments, setSegments] = useState([])
  const [activeTab, setActiveTab] = useState('NSE')
  const [activeQtyTab, setActiveQtyTab] = useState('NSE')

  // Segment-specific settings
  const [segmentSettings, setSegmentSettings] = useState({
    NSE: { margin: 10, exposure: 230000, minQty: 1, maxQty: 10000, totalLimit: 500000 },
    MCX: { margin: 10, exposure: 230000, minQty: 1, maxQty: 10000, totalLimit: 500000 },
    Forex: { margin: 10, exposure: 230000, minQty: 1, maxQty: 10000, totalLimit: 500000 }
  })

  // Fetch trading rules on mount
  useEffect(() => {
    fetchTradingRules()
  }, [])

  const fetchTradingRules = async () => {
    try {
      setLoading(true)
      const response = await tradingApi.getTradingRules()
      const data = response.data.data

      // Set general rules
      if (data.generalRules) {
        setGeneralRules(data.generalRules)
      }

      // Set market permissions
      if (data.marketPermissions) {
        setMarketPermissions(data.marketPermissions)
      }

      // Set risk management
      if (data.riskManagement) {
        setRiskManagement(data.riskManagement)
      }

      // Set segments and segment settings
      if (data.segments && data.segments.length > 0) {
        setSegments(data.segments)

        // Build segment settings from API data
        const settings = {}
        data.segments.forEach(seg => {
          settings[seg.name] = {
            margin: seg.margin?.intradayPercent || 10,
            exposure: seg.exposure || 230000,
            minQty: seg.quantityLimits?.min || 1,
            maxQty: seg.quantityLimits?.max || 10000,
            totalLimit: seg.quantityLimits?.totalLimit || 500000
          }
        })
        setSegmentSettings(prev => ({ ...prev, ...settings }))

        // Set active tab to first segment
        if (data.segments[0]) {
          setActiveTab(data.segments[0].name)
          setActiveQtyTab(data.segments[0].name)
        }
      }
    } catch (error) {
      console.error('Error fetching trading rules:', error)
      toast.error('Failed to load trading rules')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Build segment settings for API
      const apiSegmentSettings = {}
      Object.entries(segmentSettings).forEach(([name, settings]) => {
        apiSegmentSettings[name] = {
          margin: settings.margin,
          exposure: settings.exposure,
          quantityLimits: {
            min: settings.minQty,
            max: settings.maxQty,
            total: settings.totalLimit
          }
        }
      })

      const payload = {
        generalRules,
        marketPermissions,
        riskManagement,
        segmentSettings: apiSegmentSettings
      }

      console.log('Sending trading rules update:', payload)

      await tradingApi.updateTradingRules(payload)

      toast.success('Trading rules saved successfully')
    } catch (error) {
      console.error('Error saving trading rules:', error)
      console.error('Error response:', error.response?.data)
      toast.error(error.response?.data?.message || 'Failed to save trading rules')
    } finally {
      setSaving(false)
    }
  }

  const updateSegmentSetting = (segment, field, value) => {
    setSegmentSettings(prev => ({
      ...prev,
      [segment]: {
        ...prev[segment],
        [field]: value
      }
    }))
  }

  // Available segment tabs
  const segmentTabs = segments.length > 0
    ? segments.map(s => s.name)
    : ['NSE', 'MCX', 'Forex']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Save Button Header */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* General Rules */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm sm:text-base font-semibold text-gray-900">General Rules</div>
            <Switch
              checked={generalRules.enabled}
              onCheckedChange={(checked) => setGeneralRules(prev => ({ ...prev, enabled: checked }))}
            />
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
              <Switch
                checked={generalRules.advancedOrders}
                onCheckedChange={(checked) => setGeneralRules(prev => ({ ...prev, advancedOrders: checked }))}
              />
            </div>
          </div>

          {/* Auto-square off time & Trading mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Auto-square off time</label>
              <div className="relative">
                <Input
                  type="time"
                  value={generalRules.autoSquareOffTime}
                  onChange={(e) => setGeneralRules(prev => ({ ...prev, autoSquareOffTime: e.target.value }))}
                  className="pr-10 text-sm"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Trading mode</label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={generalRules.tradingMode}
                onChange={(e) => setGeneralRules(prev => ({ ...prev, tradingMode: e.target.value }))}
              >
                <option value="Demo">Demo</option>
                <option value="Live">Live</option>
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
            {segmentTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${activeTab === tab
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Margin & Exposure Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Margin (%)</label>
              <Input
                type="number"
                value={segmentSettings[activeTab]?.margin || 10}
                onChange={(e) => updateSegmentSetting(activeTab, 'margin', parseFloat(e.target.value) || 0)}
                placeholder="10"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Exposure ($)</label>
              <Input
                type="number"
                value={segmentSettings[activeTab]?.exposure || 230000}
                onChange={(e) => updateSegmentSetting(activeTab, 'exposure', parseFloat(e.target.value) || 0)}
                placeholder="230000"
                className="text-sm"
              />
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
            {segmentTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveQtyTab(tab)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded flex-shrink-0 ${activeQtyTab === tab
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quantity Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Min Qty</label>
              <Input
                type="number"
                value={segmentSettings[activeQtyTab]?.minQty || 1}
                onChange={(e) => updateSegmentSetting(activeQtyTab, 'minQty', parseInt(e.target.value) || 1)}
                placeholder="1"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Max Qty</label>
              <Input
                type="number"
                value={segmentSettings[activeQtyTab]?.maxQty || 10000}
                onChange={(e) => updateSegmentSetting(activeQtyTab, 'maxQty', parseInt(e.target.value) || 10000)}
                placeholder="10000"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Total Limit ($)</label>
              <Input
                type="number"
                value={segmentSettings[activeQtyTab]?.totalLimit || 500000}
                onChange={(e) => updateSegmentSetting(activeQtyTab, 'totalLimit', parseFloat(e.target.value) || 500000)}
                placeholder="500000"
                className="text-sm"
              />
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
            <label className="text-sm text-gray-700 mb-2 block">Max Daily loss limit ($)</label>
            <Input
              type="number"
              value={riskManagement.maxDailyLossLimit}
              onChange={(e) => setRiskManagement(prev => ({ ...prev, maxDailyLossLimit: parseFloat(e.target.value) || 0 }))}
              placeholder="43000"
              className="text-sm"
            />
          </div>

          {/* Breach account */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm font-medium text-gray-900">Breach account</div>
                <div className="text-xs text-gray-500">Auto-freeze on breach account</div>
              </div>
              <Switch
                checked={riskManagement.breachAccountAutoFreeze}
                onCheckedChange={(checked) => setRiskManagement(prev => ({ ...prev, breachAccountAutoFreeze: checked }))}
              />
            </div>
          </div>

          {/* Delete pending orders */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm font-medium text-gray-900">Delete pending orders</div>
                <div className="text-xs text-gray-500">Auto-delete pending order (EOD)</div>
              </div>
              <Switch
                checked={riskManagement.deletePendingOrdersEOD}
                onCheckedChange={(checked) => setRiskManagement(prev => ({ ...prev, deletePendingOrdersEOD: checked }))}
              />
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
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                checked={marketPermissions.NSE}
                onChange={(e) => setMarketPermissions(prev => ({ ...prev, NSE: e.target.checked }))}
              />
              NSE
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                checked={marketPermissions.MCX}
                onChange={(e) => setMarketPermissions(prev => ({ ...prev, MCX: e.target.checked }))}
              />
              MCX
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                checked={marketPermissions.Forex}
                onChange={(e) => setMarketPermissions(prev => ({ ...prev, Forex: e.target.checked }))}
              />
              Forex
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                checked={marketPermissions.Crypto}
                onChange={(e) => setMarketPermissions(prev => ({ ...prev, Crypto: e.target.checked }))}
              />
              Crypto
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save Button */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}