import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select } from '@/components/ui/select'
import { Circle, CheckCircle2, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('client-trading')
  const [profitSlider, setProfitSlider] = useState(60)
  const [autoDelete, setAutoDelete] = useState(false)
  const [expiryAuto, setExpiryAuto] = useState(true)
  const [inrConversion, setInrConversion] = useState(false)
  const [systemAlerts, setSystemAlerts] = useState(false)
  const [sendBroadcast, setSendBroadcast] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [applyNewClients, setApplyNewClients] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'client-trading', label: 'Client trading', icon: Circle },
    { id: 'profit-sharing', label: 'Profit sharing', icon: Circle },
    { id: 'notifications', label: 'Notifications', icon: Circle },
    { id: 'access-security', label: 'Access & Security', icon: Circle },
    { id: 'system-preference', label: 'System preference', icon: Circle },
  ]

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
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
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
          {/* Client Trading Tab */}
          {activeTab === 'client-trading' && (
            <div className="space-y-6">
              {/* Default Quantity Limits */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Quantity Limits</h3>
                <p className="text-sm text-gray-500 mb-4">Default Quantity Limits</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input placeholder="Min" />
                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Default Margin Type */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Margin Type</h3>
                <p className="text-sm text-gray-500 mb-4">Choose Intraday or Holding for all clients.</p>
                <Select defaultValue="intraday">
                  <option value="intraday">Intraday</option>
                  <option value="holding">Holding</option>
                </Select>
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
                        defaultChecked={['Mon', 'Tues', 'Wed', 'Thurs'].includes(day)}
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
                        defaultChecked 
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
                <Select defaultValue="percentage">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </Select>
              </div>

              {/* Default Commission Value */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Commission Value</h3>
                <p className="text-sm text-gray-500 mb-4">Set base commission amount</p>
                <Input placeholder="Percentage" />
              </div>

              {/* Default Profit Share */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Profit Share</h3>
                <p className="text-sm text-gray-500 mb-4">Manager vs Client ratio (e.g., 70/30).</p>
                <Slider value={profitSlider} onChange={setProfitSlider} />
                <div className="text-sm text-gray-700 mt-2">80%-20%</div>
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
                <p className="text-sm text-gray-500 mb-4">Select which markets clients can trade.</p>
                <div className="flex flex-wrap gap-4">
                  {['Push notification', 'Email', 'In-app'].map((channel) => (
                    <label key={channel} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        defaultChecked={channel !== 'Email'}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500" 
                      />
                      <span className="text-sm text-gray-700">{channel}</span>
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
                <Select defaultValue="percentage">
                  <option value="percentage">Percentage</option>
                  <option value="30min">30 minutes</option>
                  <option value="60min">60 minutes</option>
                </Select>
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
                <Select defaultValue="english">
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </Select>
              </div>

              {/* Default Report Format */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Default Report Format</h3>
                <p className="text-sm text-gray-500 mb-4">Choose display language.</p>
                <Select defaultValue="csv">
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}