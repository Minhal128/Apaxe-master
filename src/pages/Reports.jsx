import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Search, ChevronDown, Download, MoreVertical, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { reportsApi, tradingApi } from '@/lib/api'
import ReportsSkeleton from '@/components/ReportsSkeleton'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'

export default function Reports() {
  const [activeTab, setActiveTab] = useState('trading')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [statsData, setStatsData] = useState(null)

  // Tab-specific data
  const [tradingReportData, setTradingReportData] = useState([])
  const [pnlReportData, setPnlReportData] = useState([])
  const [commissionReportData, setCommissionReportData] = useState([])
  const [ledgerReportData, setLedgerReportData] = useState([])
  const [exposureReportData, setExposureReportData] = useState([])

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    fetchTabData()
  }, [activeTab])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const response = await reportsApi.getReportStats()
      if (response.data && response.data.data) {
        setStatsData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching report stats:', error)
      toast.error('Failed to load report statistics')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTabData = async () => {
    try {
      setIsTabLoading(true)
      let response
      switch (activeTab) {
        case 'trading':
          response = await tradingApi.getClientTrades()
          setTradingReportData(response.data.data.trades || [])
          break
        case 'pnl':
          response = await reportsApi.getPnLReport()
          setPnlReportData(response.data.data || [])
          break
        case 'commission':
          response = await reportsApi.getCommissionReport()
          setCommissionReportData(response.data.data || [])
          break
        case 'ledger':
          response = await reportsApi.getLedgerReport()
          setLedgerReportData(response.data.data || [])
          break
        case 'exposure':
          response = await reportsApi.getExposureReport()
          setExposureReportData(response.data.data || [])
          break
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} report:`, error)
      toast.error(`Failed to load ${activeTab} report`)
    } finally {
      setIsTabLoading(false)
    }
  }

  if (isLoading) return <ReportsSkeleton />


  const stats = statsData?.stats || {
    totalClientsManaged: 0,
    totalTradesToday: 0,
    totalPnLWeekly: '$0.00',
    totalCommissionEarned: '$0.00'
  }

  const pnlData = statsData?.pnlHistory || []

  const handleExport = () => {
    try {
      let data = []
      let filename = ''

      switch (activeTab) {
        case 'trading':
          data = tradingReportData.map(item => ({
            'Date': item.date,
            'Client Name': item.client,
            'Market Segment': item.market,
            'Instrument': item.instrument,
            'Order Type': item.type,
            'Quantity': item.qty,
            'Price': item.price,
            'P&L': item.pnl
          }))
          filename = 'Trading_Report.xlsx'
          break
        case 'pnl':
          data = pnlReportData.map(item => ({
            'Client Name': item.client,
            'Total Trades': item.trades,
            'Realized P&L': item.realized,
            'Unrealized P&L': item.unrealized,
            'Net P&L': item.net
          }))
          filename = 'PnL_Report.xlsx'
          break
        case 'commission':
          data = commissionReportData.map(item => ({
            'Client Name': item.client,
            'Segment': item.segment,
            'Commission Type': item.type,
            'Rate': item.rate,
            'Manager Share': item.managerShare,
            'Total Earned': item.earned
          }))
          filename = 'Commission_Report.xlsx'
          break
        case 'ledger':
          data = ledgerReportData.map(item => ({
            'Date': item.date,
            'Client': item.client,
            'Type': item.type,
            'Amount': item.amount,
            'Description': item.description,
            'Balance After': item.balance
          }))
          filename = 'Ledger_Report.xlsx'
          break
        case 'exposure':
          data = exposureReportData.map(item => ({
            'Client': item.client,
            'Credit Limit': item.creditLimit,
            'Margin Used': item.marginUsed,
            'Exposure': item.exposure,
            'Status': item.status
          }))
          filename = 'Exposure_Report.xlsx'
          break
      }

      if (data.length === 0) {
        toast.warning('No data to export')
        return
      }

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')

      // Generate and download file
      XLSX.writeFile(workbook, filename)
      toast.success('Report exported successfully')
    } catch (error) {
      console.error('Error exporting report:', error)
      toast.error('Failed to export report')
    }
  }

  const tabs = [
    { id: 'trading', label: 'Trading Report' },
    { id: 'pnl', label: 'P&L Report' },
    { id: 'commission', label: 'Commission Report' },
    { id: 'ledger', label: 'Ledger Report' },
    { id: 'exposure', label: 'Exposure Report' },
  ]

  const renderMobileCardView = (data, type) => {
    switch (type) {
      case 'trading':
        return data.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{item.client}</div>
                  <div className="text-sm text-gray-500 whitespace-pre-line">{item.date}</div>
                </div>
                <div className="text-green-500 font-semibold">{item.pnl}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Market</div>
                  <div className="font-medium">{item.market}</div>
                </div>
                <div>
                  <div className="text-gray-500">Instrument</div>
                  <div className="font-medium">{item.instrument}</div>
                </div>
                <div>
                  <div className="text-gray-500">Type</div>
                  <div className="font-medium">{item.type}</div>
                </div>
                <div>
                  <div className="text-gray-500">Qty/Price</div>
                  <div className="font-medium">{item.qty} / {item.price}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))

      case 'pnl':
        return data.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-gray-900">{item.client}</div>
                <div className="text-green-500 font-semibold">{item.net}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Trades</div>
                  <div className="font-medium">{item.trades}</div>
                </div>
                <div>
                  <div className="text-gray-500">Realized</div>
                  <div className="text-green-500 font-medium">{item.realized}</div>
                </div>
                <div>
                  <div className="text-gray-500">Unrealized</div>
                  <div className="text-green-500 font-medium">{item.unrealized}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))

      case 'commission':
        return data.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-gray-900">{item.client}</div>
                <div className="text-gray-900 font-semibold">{item.earned}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Segment</div>
                  <div className="font-medium">{item.segment}</div>
                </div>
                <div>
                  <div className="text-gray-500">Type</div>
                  <div className="font-medium">{item.type}</div>
                </div>
                <div>
                  <div className="text-gray-500">Rate</div>
                  <div className="font-medium">{item.rate}</div>
                </div>
                <div>
                  <div className="text-gray-500">Manager Share</div>
                  <div className="font-medium">{item.managerShare}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))

      case 'ledger':
        return data.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-gray-900">{item.client}</div>
                <div className="text-gray-900 font-semibold">{item.amount}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Date</div>
                  <div className="font-medium">{item.date}</div>
                </div>
                <div>
                  <div className="text-gray-500">Type</div>
                  <div className="font-medium">{item.type}</div>
                </div>
                <div>
                  <div className="text-gray-500">Description</div>
                  <div className="font-medium">{item.description}</div>
                </div>
                <div>
                  <div className="text-gray-500">Balance</div>
                  <div className="font-medium">{item.balance}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))

      case 'exposure':
        return data.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-gray-900">{item.client}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Safe'
                  ? 'bg-green-100 text-green-600'
                  : item.status === 'Critical'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-orange-100 text-orange-600'
                  }`}>
                  {item.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Credit Limit</div>
                  <div className="font-medium">{item.creditLimit}</div>
                </div>
                <div>
                  <div className="text-gray-500">Margin Used</div>
                  <div className="font-medium">{item.marginUsed}</div>
                </div>
                <div>
                  <div className="text-gray-500">Exposure</div>
                  <div className="font-medium">{item.exposure}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))

      default:
        return null
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Clients Managed</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">{stats.totalClientsManaged}</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 100 }, { v: 105 }, { v: 102 }, { v: 108 }, { v: 112 }, { v: 110 }, { v: 115 }, { v: 118 }, { v: 116 }, { v: 120 }, { v: 123 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Trades today</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">{stats.totalTradesToday}</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 100 }, { v: 110 }, { v: 105 }, { v: 115 }, { v: 120 }, { v: 118 }, { v: 122 }, { v: 125 }, { v: 123 }, { v: 127 }, { v: 124 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total P&L (This week)</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">{stats.totalPnLWeekly}</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 80 }, { v: 90 }, { v: 85 }, { v: 95 }, { v: 100 }, { v: 98 }, { v: 105 }, { v: 110 }, { v: 115 }, { v: 120 }, { v: 123 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Commission Earned</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">{stats.totalCommissionEarned}</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 300 }, { v: 320 }, { v: 340 }, { v: 350 }, { v: 360 }, { v: 370 }, { v: 380 }, { v: 385 }, { v: 390 }, { v: 395 }, { v: 400 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* P&L Overview Chart */}
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 lg:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">P&L Overview</h3>
          </div>

          <div className="h-48 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pnlData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  ticks={[0, 10, 20, 30, 40, 50]}
                />
                <Bar dataKey="gray" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <div>
        {/* Mobile Tabs - Scrollable */}
        <div className="lg:hidden overflow-x-auto pb-2 mb-4">
          <div className="flex gap-4 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-8 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                ? 'text-green-500'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Report Content */}
        <Card>
          <CardContent className="p-4 lg:p-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 lg:mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-9 w-full bg-white border-gray-200"
                  />
                </div>
              </div>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-full lg:w-auto"
                onClick={handleExport}
              >
                <Download size={18} />
                <span className="ml-2">Export</span>
              </Button>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              {activeTab === 'trading' && renderMobileCardView(tradingReportData, 'trading')}
              {activeTab === 'pnl' && renderMobileCardView(pnlReportData, 'pnl')}
              {activeTab === 'commission' && renderMobileCardView(commissionReportData, 'commission')}
              {activeTab === 'ledger' && renderMobileCardView(ledgerReportData, 'ledger')}
              {activeTab === 'exposure' && renderMobileCardView(exposureReportData, 'exposure')}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              {/* Trading Report Table */}
              {activeTab === 'trading' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 font-medium">Date</TableHead>
                      <TableHead className="text-gray-600 font-medium">Client Name</TableHead>
                      <TableHead className="text-gray-600 font-medium">Market segment</TableHead>
                      <TableHead className="text-gray-600 font-medium">Instrument</TableHead>
                      <TableHead className="text-gray-600 font-medium">Order Type</TableHead>
                      <TableHead className="text-gray-600 font-medium">QTY</TableHead>
                      <TableHead className="text-gray-600 font-medium">Price</TableHead>
                      <TableHead className="text-gray-600 font-medium">P&L</TableHead>
                      <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isTabLoading ? (
                      <TableRow><TableCell colSpan={9} className="text-center py-10 text-gray-400 italic">Loading...</TableCell></TableRow>
                    ) : tradingReportData.length === 0 ? (
                      <TableRow><TableCell colSpan={9} className="text-center py-10 text-gray-400">No trades found</TableCell></TableRow>
                    ) : (
                      tradingReportData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900 whitespace-pre-line text-xs">{item.date}</TableCell>
                          <TableCell className="text-gray-900">{item.client}</TableCell>
                          <TableCell className="text-gray-900">{item.market}</TableCell>
                          <TableCell className="text-gray-900">{item.instrument}</TableCell>
                          <TableCell className="text-gray-900">{item.type}</TableCell>
                          <TableCell className="text-gray-900">{item.qty}</TableCell>
                          <TableCell className="text-gray-900">{item.price}</TableCell>
                          <TableCell className="text-gray-900">{item.pnl}</TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}

              {/* P&L Report Table */}
              {activeTab === 'pnl' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 font-medium">Client Name</TableHead>
                      <TableHead className="text-gray-600 font-medium">Total trades</TableHead>
                      <TableHead className="text-gray-600 font-medium">Realized P&L</TableHead>
                      <TableHead className="text-gray-600 font-medium">Unrealized P&L</TableHead>
                      <TableHead className="text-gray-600 font-medium">Net P&L</TableHead>
                      <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isTabLoading ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400 italic">Loading...</TableCell></TableRow>
                    ) : pnlReportData.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400">No data found</TableCell></TableRow>
                    ) : (
                      pnlReportData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.client}</TableCell>
                          <TableCell className="text-gray-900">{item.trades}</TableCell>
                          <TableCell className={item.realized.includes('-') ? 'text-red-500' : 'text-green-500'}>{item.realized}</TableCell>
                          <TableCell className={item.unrealized.includes('-') ? 'text-red-500' : 'text-green-500'}>{item.unrealized}</TableCell>
                          <TableCell className={item.net.includes('-') ? 'text-red-500' : 'text-green-500'}>{item.net}</TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}

              {/* Commission Report Table */}
              {activeTab === 'commission' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 font-medium">Client Name</TableHead>
                      <TableHead className="text-gray-600 font-medium">Segment</TableHead>
                      <TableHead className="text-gray-600 font-medium">Commission Type</TableHead>
                      <TableHead className="text-gray-600 font-medium">Rate</TableHead>
                      <TableHead className="text-gray-600 font-medium">Manager share</TableHead>
                      <TableHead className="text-gray-600 font-medium">Total Earned</TableHead>
                      <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isTabLoading ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-10 text-gray-400 italic">Loading...</TableCell></TableRow>
                    ) : commissionReportData.length === 0 ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-10 text-gray-400">No commissions found</TableCell></TableRow>
                    ) : (
                      commissionReportData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.client}</TableCell>
                          <TableCell className="text-gray-900">{item.segment}</TableCell>
                          <TableCell className="text-gray-900">{item.type}</TableCell>
                          <TableCell className="text-gray-900">{item.rate}</TableCell>
                          <TableCell className="text-gray-900">{item.managerShare}</TableCell>
                          <TableCell className="text-gray-900">{item.earned}</TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}

              {/* Ledger Report Table */}
              {activeTab === 'ledger' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 font-medium">Date</TableHead>
                      <TableHead className="text-gray-600 font-medium">Client</TableHead>
                      <TableHead className="text-gray-600 font-medium">Type</TableHead>
                      <TableHead className="text-gray-600 font-medium">Amount</TableHead>
                      <TableHead className="text-gray-600 font-medium">Description</TableHead>
                      <TableHead className="text-gray-600 font-medium">Balance After</TableHead>
                      <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isTabLoading ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-10 text-gray-400 italic">Loading...</TableCell></TableRow>
                    ) : ledgerReportData.length === 0 ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-10 text-gray-400">No ledger entries found</TableCell></TableRow>
                    ) : (
                      ledgerReportData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.date}</TableCell>
                          <TableCell className="text-gray-900">{item.client}</TableCell>
                          <TableCell className="text-gray-900">{item.type}</TableCell>
                          <TableCell className="text-gray-900">{item.amount}</TableCell>
                          <TableCell className="text-gray-900">{item.description}</TableCell>
                          <TableCell className="text-gray-900">{item.balance}</TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}

              {/* Exposure Report Table */}
              {activeTab === 'exposure' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 font-medium">Client</TableHead>
                      <TableHead className="text-gray-600 font-medium">Credit Limit</TableHead>
                      <TableHead className="text-gray-600 font-medium">Margin used</TableHead>
                      <TableHead className="text-gray-600 font-medium">Exposure</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isTabLoading ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400 italic">Loading...</TableCell></TableRow>
                    ) : exposureReportData.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400">No data found</TableCell></TableRow>
                    ) : (
                      exposureReportData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.client}</TableCell>
                          <TableCell className="text-gray-900">{item.creditLimit}</TableCell>
                          <TableCell className="text-gray-900">{item.marginUsed}</TableCell>
                          <TableCell className="text-gray-900">{item.exposure}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded text-xs font-medium ${item.status === 'Safe'
                              ? 'bg-green-100 text-green-600'
                              : item.status === 'Critical'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-orange-100 text-orange-600'
                              }`}>
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}