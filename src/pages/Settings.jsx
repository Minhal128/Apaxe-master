import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select } from '@/components/ui/select'
import { Circle, CheckCircle2, Menu, X, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { settingsApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('client-trading')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Client Trading
  const [minQty, setMinQty] = useState(1)
  const [maxQty, setMaxQty] = useState(10000)
  const [marginType, setMarginType] = useState('intraday')
  const [autoDelete, setAutoDelete] = useState(true)
  const [expiryAuto, setExpiryAuto] = useState(true)
  const [inrConversion, setInrConversion] = useState(false)
  const [tradingDays, setTradingDays] = useState(['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'])
  const [allowedSegments, setAllowedSegments] = useState(['NSE', 'MCX', 'Forex', 'Equity'])

  // Profit Sharing
  const [commissionType, setCommissionType] = useState('percentage')
  const [commissionValue, setCommissionValue] = useState(0.5)
  const [profitSlider, setProfitSlider] = useState(60)
  const [applyNewClients, setApplyNewClients] = useState(true)

  // Notifications
  const [systemAlerts, setSystemAlerts] = useState(true)
  const [sendBroadcast, setSendBroadcast] = useState(true)
  const [deliveryChannels, setDeliveryChannels] = useState(['push', 'in-app'])

  // Access & Security
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)

  // System Preference
  const [language, setLanguage] = useState('english')
  const [reportFormat, setReportFormat] = useState('excel')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await settingsApi.getSettings()
      const data = response.data.data

      // Client Trading
      if (data.clientTrading) {
        setMinQty(data.clientTrading.defaultQuantityLimits?.min || 1)
        setMaxQty(data.clientTrading.defaultQuantityLimits?.max || 10000)
        setMarginType(data.clientTrading.defaultMarginType || 'intraday')
        setTradingDays(data.clientTrading.tradingDays || [])
        setAllowedSegments(data.clientTrading.allowedSegments || [])
        setAutoDelete(data.clientTrading.autoDeletePendingOrders ?? true)
        setExpiryAuto(data.clientTrading.expiryDayAutoClose ?? true)
        setInrConversion(data.clientTrading.inrConversion ?? false)
      }

      // Profit Sharing
      if (data.profitSharing) {
        setCommissionType(data.profitSharing.defaultCommissionType || 'percentage')
        setCommissionValue(data.profitSharing.defaultCommissionValue || 0.5)
        setProfitSlider(data.profitSharing.defaultProfitShare || 60)
        setApplyNewClients(data.profitSharing.applyToNewClients ?? true)
      }

      // Notifications
      if (data.notifications) {
        setSystemAlerts(data.notifications.receiveSystemAlerts ?? true)
        setSendBroadcast(data.notifications.sendBroadcastToClients ?? true)
        setDeliveryChannels(data.notifications.deliveryChannels || [])
      }

      // Access & Security
      if (data.accessSecurity) {
        setTwoFactor(data.accessSecurity.twoFactorAuth ?? false)
        setSessionTimeout(data.accessSecurity.sessionTimeout || 30)
      }

      // System Preference
      if (data.systemPreference) {
        setLanguage(data.systemPreference.language || 'english')
        setReportFormat(data.systemPreference.defaultReportFormat || 'excel')
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      let category = ''
      let settings = {}

      switch (activeTab) {
        case 'client-trading':
          category = 'clientTrading'
          settings = {
            defaultQuantityLimits: { min: minQty, max: maxQty },
            defaultMarginType: marginType,
            tradingDays,
            allowedSegments,
            autoDeletePendingOrders: autoDelete,
            expiryDayAutoClose: expiryAuto,
            inrConversion
          }
          break
        case 'profit-sharing':
          category = 'profitSharing'
          settings = {
            defaultCommissionType: commissionType,
            defaultCommissionValue: commissionValue,
            defaultProfitShare: profitSlider,
            applyToNewClients
          }
          break
        case 'notifications':
          category = 'notifications'
          settings = {
            receiveSystemAlerts: systemAlerts,
            sendBroadcastToClients: sendBroadcast,
            deliveryChannels
          }
          break
        case 'access-security':
          category = 'accessSecurity'
          settings = {
            twoFactorAuth: twoFactor,
            sessionTimeout
          }
          break
        case 'system-preference':
          category = 'systemPreference'
          settings = {
            language,
            defaultReportFormat: reportFormat
          }
          break
      }

      await settingsApi.updateSettings(category, settings)
      toast.success('Settings updated successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const toggleTradingDay = (day) => {
    setTradingDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const toggleSegment = (segment) => {
    setAllowedSegments(prev =>
      prev.includes(segment) ? prev.filter(s => s !== segment) : [...prev, segment]
    )
  }

  const toggleDeliveryChannel = (channel) => {
    setDeliveryChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    )
  }

  const tabs = [
    { id: 'client-trading', label: 'Client trading', icon: Circle },
    { id: 'profit-sharing', label: 'Profit sharing', icon: Circle },
    { id: 'notifications', label: 'Notifications', icon: Circle },
    { id: 'access-security', label: 'Access & Security', icon: Circle },
    { id: 'system-preference', label: 'System preference', icon: Circle },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 p-4 md:p-6">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          {tabs.find(tab => tab.id === activeTab)?.label}
        </button>
      </div>

      {/* Left Sidebar Menu */}
      <Card className={`w-full lg:w-[220px] h-fit ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm transition-colors ${activeTab === tab.id
                    ? 'text-green-500 font-medium bg-green-50'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {activeTab === tab.id ? (
                  <CheckCircle2 size={16} className="text-green-500 md:size-[18px]" />
                ) : (
                  <tab.icon size={16} className="md:size-[18px]" />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Right Content Area */}
      <Card className="flex-1">
        <CardContent className="p-4 md:p-6 lg:p-8">
          {/* Save Button */}
          <div className="flex justify-end mb-6">
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

          {/* Client Trading Tab */}
          {activeTab === 'client-trading' && (
            <div className="space-y-6">
              {/* Default Quantity Limits */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Quantity Limits</h3>
                <p className="text-sm text-gray-500 mb-4">Set minimum and maximum quantities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={minQty}
                    onChange={(e) => setMinQty(parseInt(e.target.value) || 1)}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={maxQty}
                    onChange={(e) => setMaxQty(parseInt(e.target.value) || 10000)}
                  />
                </div>
              </div>

              {/* Default Margin Type */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Margin Type</h3>
                <p className="text-sm text-gray-500 mb-4">Choose Intraday or Holding for all clients.</p>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={marginType}
                  onChange={(e) => setMarginType(e.target.value)}
                >
                  <option value="intraday">Intraday</option>
                  <option value="holding">Holding</option>
                </select>
              </div>

              {/* Trading Days */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Trading Days</h3>
                <p className="text-sm text-gray-500 mb-4">Choose active days (Mon–Fri, etc.)</p>
                <div className="flex flex-wrap gap-3 md:gap-2">
                  {['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tradingDays.includes(day)}
                        onChange={() => toggleTradingDay(day)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 whitespace-nowrap">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Allowed Segments */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Allowed Segments</h3>
                <p className="text-sm text-gray-500 mb-4">Select which markets clients can trade.</p>
                <div className="flex flex-wrap gap-4">
                  {['NSE', 'MCX', 'Forex', 'Equity'].map((segment) => (
                    <label key={segment} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={allowedSegments.includes(segment)}
                        onChange={() => toggleSegment(segment)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{segment}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Switch Settings */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-t gap-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Auto-Delete Pending Orders (EOD)</h3>
                    <p className="text-sm text-gray-500">Cancel unexecuted orders after market close.</p>
                  </div>
                  <Switch checked={autoDelete} onCheckedChange={setAutoDelete} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-t gap-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Expiry-Day Auto Close</h3>
                    <p className="text-sm text-gray-500">Auto close positions on expiry day.</p>
                  </div>
                  <Switch checked={expiryAuto} onCheckedChange={setExpiryAuto} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-t gap-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">INR Conversion</h3>
                    <p className="text-sm text-gray-500">Convert international scripts to INR value.</p>
                  </div>
                  <Switch checked={inrConversion} onCheckedChange={setInrConversion} />
                </div>
              </div>
            </div>
          )}

          {/* Profit Sharing Tab */}
          {activeTab === 'profit-sharing' && (
            <div className="space-y-6">
              {/* Default Commission Type */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Commission Type</h3>
                <p className="text-sm text-gray-500 mb-4">Choose Percentage or Fixed</p>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={commissionType}
                  onChange={(e) => setCommissionType(e.target.value)}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>

              {/* Default Commission Value */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Commission Value</h3>
                <p className="text-sm text-gray-500 mb-4">Set base commission amount</p>
                <Input
                  placeholder="0.5"
                  type="number"
                  step="0.1"
                  value={commissionValue}
                  onChange={(e) => setCommissionValue(parseFloat(e.target.value) || 0.5)}
                />
              </div>

              {/* Default Profit Share */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Profit Share</h3>
                <p className="text-sm text-gray-500 mb-4">Manager vs Client ratio (e.g., 70/30).</p>
                <Slider
                  value={[profitSlider]}
                  onValueChange={(value) => setProfitSlider(value[0])}
                  min={0}
                  max={100}
                />
                <div className="text-sm text-gray-700 mt-2">{profitSlider}% Manager - {100 - profitSlider}% Client</div>
              </div>

              {/* Apply to New Clients */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-t gap-2">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">Apply to New Clients</h3>
                  <p className="text-sm text-gray-500">Auto-assign these settings during client creation.</p>
                </div>
                <Switch checked={applyNewClients} onCheckedChange={setApplyNewClients} />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Switch Settings */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Receive System Alerts</h3>
                    <p className="text-sm text-gray-500">Enable trade alerts, fund updates, etc.</p>
                  </div>
                  <Switch checked={systemAlerts} onCheckedChange={setSystemAlerts} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-t gap-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">Send Broadcasts to Clients</h3>
                    <p className="text-sm text-gray-500">Manager can send notices to all clients.</p>
                  </div>
                  <Switch checked={sendBroadcast} onCheckedChange={setSendBroadcast} />
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Delivery Channels</h3>
                <p className="text-sm text-gray-500 mb-4">Select notification delivery methods</p>
                <div className="flex flex-wrap gap-4">
                  {['push', 'email', 'in-app'].map((channel) => (
                    <label key={channel} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={deliveryChannels.includes(channel)}
                        onChange={() => toggleDeliveryChannel(channel)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{channel === 'push' ? 'Push notification' : channel === 'in-app' ? 'In-app' : 'Email'}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Access & Security Tab */}
          {activeTab === 'access-security' && (
            <div className="space-y-6">
              {/* 2FA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">2FA (Two-Factor Authentication)</h3>
                  <p className="text-sm text-gray-500">Require for login.</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>

              {/* Session Timeout */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Session Timeout</h3>
                <p className="text-sm text-gray-500 mb-4">Auto logout after X minutes.</p>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
            </div>
          )}

          {/* System Preference Tab */}
          {activeTab === 'system-preference' && (
            <div className="space-y-6">
              {/* Language */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Language</h3>
                <p className="text-sm text-gray-500 mb-4">Choose display language.</p>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              {/* Default Report Format */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Report Format</h3>
                <p className="text-sm text-gray-500 mb-4">Choose default export format</p>
                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                >
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}