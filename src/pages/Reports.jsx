import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Search, ChevronDown, Download, MoreVertical, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Reports() {
  const [activeTab, setActiveTab] = useState('trading')
  const [showFilters, setShowFilters] = useState(false)

  const pnlData = [
    { date: 'Sept 10', value: 40, gray: 50 },
    { date: 'Sept 11', value: 10, gray: 50 },
    { date: 'Sept 12', value: 30, gray: 50 },
    { date: 'Sept 13', value: 25, gray: 50 },
    { date: 'Sept 14', value: 30, gray: 50 },
    { date: 'Sept 15', value: 15, gray: 50 },
    { date: 'Sept 16', value: 20, gray: 50 },
  ]

  const tradingReportData = [
    { date: '2025-10-15\n10:32 AM', client: 'Amit Sharma', market: 'NSE-F&O', instrument: 'NIFTY0CTM5600CE', type: 'Market', qty: '20', price: '$118.50', pnl: '$+1240' },
    { date: '2025-10-15\n10:32 AM', client: 'Amit Sharma', market: 'NSE-F&O', instrument: 'NIFTY0CTM5600CE', type: 'Market', qty: '20', price: '$118.50', pnl: '$+1240' },
    { date: '2025-10-15\n10:32 AM', client: 'Amit Sharma', market: 'NSE-F&O', instrument: 'NIFTY0CTM5600CE', type: 'Market', qty: '20', price: '$118.50', pnl: '$+1240' },
    { date: '2025-10-15\n10:32 AM', client: 'Amit Sharma', market: 'NSE-F&O', instrument: 'NIFTY0CTM5600CE', type: 'Market', qty: '20', price: '$118.50', pnl: '$+1240' },
  ]

  const pnlReportData = [
    { client: 'Amit Sharma', trades: '54', realized: '+$12,800', unrealized: '+$2,330', net: '+$15,100' },
    { client: 'Amit Sharma', trades: '54', realized: '+$12,800', unrealized: '+$2,330', net: '+$15,100' },
    { client: 'Amit Sharma', trades: '54', realized: '+$12,800', unrealized: '+$2,330', net: '+$15,100' },
    { client: 'Amit Sharma', trades: '54', realized: '+$12,800', unrealized: '+$2,330', net: '+$15,100' },
  ]

  const commissionReportData = [
    { client: 'Deepa Singh', segment: 'MCX', type: 'Fixed', rate: '$50 / lot', managerShare: '$250', earned: '$250' },
    { client: 'Deepa Singh', segment: 'MCX', type: 'Fixed', rate: '$50 / lot', managerShare: '$250', earned: '$250' },
    { client: 'Deepa Singh', segment: 'MCX', type: 'Fixed', rate: '$50 / lot', managerShare: '$250', earned: '$250' },
    { client: 'Deepa Singh', segment: 'MCX', type: 'Fixed', rate: '$50 / lot', managerShare: '$250', earned: '$250' },
  ]

  const ledgerReportData = [
    { date: '2025-10-14', client: 'Ravi Nair', type: 'Debit', amount: '$50,000', description: 'Admin Top-up', balance: '$90,000' },
    { date: '2025-10-14', client: 'Ravi Nair', type: 'Debit', amount: '$50,000', description: 'Admin Top-up', balance: '$90,000' },
    { date: '2025-10-14', client: 'Ravi Nair', type: 'Debit', amount: '$50,000', description: 'Admin Top-up', balance: '$90,000' },
    { date: '2025-10-14', client: 'Ravi Nair', type: 'Debit', amount: '$50,000', description: 'Admin Top-up', balance: '$90,000' },
  ]

  const exposureReportData = [
    { client: 'Ravi Nair', creditLimit: '$100,000', marginUsed: '$50,000', exposure: '$75,000', status: 'Safe' },
    { client: 'Ravi Nair', creditLimit: '$100,000', marginUsed: '$50,000', exposure: '$75,000', status: 'Critical' },
    { client: 'Ravi Nair', creditLimit: '$100,000', marginUsed: '$50,000', exposure: '$75,000', status: 'Warning' },
    { client: 'Ravi Nair', creditLimit: '$100,000', marginUsed: '$50,000', exposure: '$75,000', status: 'Safe' },
  ]

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
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'Safe' 
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
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Clients Managed</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">123</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:100},{v:105},{v:102},{v:108},{v:112},{v:110},{v:115},{v:118},{v:116},{v:120},{v:123}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Trades today</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">124</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:100},{v:110},{v:105},{v:115},{v:120},{v:118},{v:122},{v:125},{v:123},{v:127},{v:124}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total P&L (This week)</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">$123k</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:80},{v:90},{v:85},{v:95},{v:100},{v:98},{v:105},{v:110},{v:115},{v:120},{v:123}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Commission Earned</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">$400k</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:300},{v:320},{v:340},{v:350},{v:360},{v:370},{v:380},{v:385},{v:390},{v:395},{v:400}]}>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Summary</span>
                <button className="px-3 py-1.5 text-sm text-green-500 bg-green-50 rounded flex items-center gap-1">
                  Market Type
                  <ChevronDown size={14} />
                </button>
              </div>
              <button className="px-3 py-1.5 text-sm text-gray-600 rounded flex items-center gap-1">
                Last 14 Days
                <ChevronDown size={14} />
              </button>
            </div>
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
                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${
                  activeTab === tab.id
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
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
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
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex items-center justify-between w-full">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Search"
                      className="pl-9 w-full bg-white border-gray-200"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={18} />
                  </Button>
                </div>

                {/* Desktop Search */}
                <div className="hidden lg:block relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-9 w-64 bg-white border-gray-200"
                  />
                </div>

                {/* Filters - Hidden on mobile by default */}
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-start lg:items-center gap-3 w-full lg:w-auto`}>
                  <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                    Client
                    <ChevronDown size={16} />
                  </button>
                  <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                    Segment
                    <ChevronDown size={16} />
                  </button>
                  <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                    Date range
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full lg:w-auto mt-2 lg:mt-0">
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
                    {tradingReportData.map((item, index) => (
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
                    ))}
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
                    {pnlReportData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-gray-900">{item.client}</TableCell>
                        <TableCell className="text-gray-900">{item.trades}</TableCell>
                        <TableCell className="text-green-500">{item.realized}</TableCell>
                        <TableCell className="text-green-500">{item.unrealized}</TableCell>
                        <TableCell className="text-green-500">{item.net}</TableCell>
                        <TableCell>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
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
                    {commissionReportData.map((item, index) => (
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
                    ))}
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
                    {ledgerReportData.map((item, index) => (
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
                    ))}
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
                    {exposureReportData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-gray-900">{item.client}</TableCell>
                        <TableCell className="text-gray-900">{item.creditLimit}</TableCell>
                        <TableCell className="text-gray-900">{item.marginUsed}</TableCell>
                        <TableCell className="text-gray-900">{item.exposure}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded text-xs font-medium ${
                            item.status === 'Safe' 
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
                    ))}
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