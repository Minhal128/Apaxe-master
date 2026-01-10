import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { MoreVertical, TrendingUp } from 'lucide-react'
import { dashboardApi, tradingApi } from '@/lib/api'
import DashboardSkeleton from '@/components/DashboardSkeleton'
import { useWebSocket } from '@/contexts/WebSocketContext'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    stats: {
      activeClients: 0,
      tradesToday: 0,
      totalPnL: 0,
      totalFunds: 0
    },
    topClients: [],
    pnlHistory: [],
    recentTrades: []
  })
  const { prices } = useWebSocket()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, tradesRes] = await Promise.all([
          dashboardApi.getDashboard(),
          tradingApi.getClientTrades({ limit: 5 })
        ])

        const dashboardData = dashboardRes.data.data
        const tradesData = tradesRes.data.data

        setData({
          stats: {
            activeClients: dashboardData.stats.totalActiveClients || 0,
            tradesToday: dashboardData.stats.totalTradesToday || 0,
            totalPnL: parseFloat(dashboardData.stats.totalPnL) || 0,
            totalFunds: parseFloat(dashboardData.stats.totalFunds) || 0
          },
          topClients: dashboardData.topClients || [],
          pnlHistory: dashboardData.pnlHistory || [],
          recentTrades: tradesData?.trades || dashboardData.recentTrades || []
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  const { stats, topClients, pnlHistory, recentTrades } = data

  // Calculate total P&L for display
  const totalPnLAmount = topClients.reduce((acc, curr) => acc + (curr.totalPnL || 0), 0)
  const pnlPercentChange = totalPnLAmount > 0 ? ((totalPnLAmount / (stats.totalFunds || 1)) * 100).toFixed(2) : '0.00'

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Active Clients */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Active Clients</div>
            <div className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">{stats.activeClients}</div>
            <div className="h-10 md:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 20 }, { v: 22 }, { v: 21 }, { v: 23 }, { v: 25 }, { v: 24 }, { v: 26 }, { v: 28 }, { v: 27 }, { v: 29 }, { v: 30 }, { v: 28 }, { v: 30 }, { v: 32 }, { v: 31 }, { v: 33 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Trades today */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Trades today</div>
            <div className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">{stats.tradesToday}</div>
            <div className="h-10 md:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 100 }, { v: 110 }, { v: 105 }, { v: 115 }, { v: 120 }, { v: 118 }, { v: 122 }, { v: 125 }, { v: 123 }, { v: 127 }, { v: 130 }, { v: 128 }, { v: 132 }, { v: 135 }, { v: 133 }, { v: 124 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total P&L */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-1">Total P&L</div>
            <div className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">${stats.totalPnL.toLocaleString()}</div>
            <div className="h-10 md:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 80 }, { v: 90 }, { v: 85 }, { v: 95 }, { v: 100 }, { v: 98 }, { v: 102 }, { v: 105 }, { v: 103 }, { v: 107 }, { v: 110 }, { v: 115 }, { v: 118 }, { v: 120 }, { v: 122 }, { v: 123 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Funds */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Funds</div>
            <div className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">${stats.totalFunds.toLocaleString()}</div>
            <div className="h-10 md:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 300 }, { v: 320 }, { v: 310 }, { v: 330 }, { v: 350 }, { v: 340 }, { v: 360 }, { v: 370 }, { v: 365 }, { v: 375 }, { v: 380 }, { v: 385 }, { v: 390 }, { v: 395 }, { v: 398 }, { v: 400 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top clients */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <div className="text-sm text-gray-500">Top clients</div>
                <div className="text-xl md:text-2xl font-semibold">
                  ${totalPnLAmount.toLocaleString()}
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-2 h-8 bg-gray-200 rounded"></div>
                <div className="w-2 h-6 bg-gray-200 rounded ml-1"></div>
                <div className="w-2 h-4 bg-gray-200 rounded ml-1"></div>
              </div>
            </div>
            <div className="h-48 md:h-64 relative">
              {topClients.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topClients} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(v) => `$${v}`} />
                    <Bar
                      dataKey="totalPnL"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No client data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* P&L Overview */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="text-sm text-gray-500">P&L Overview</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={14} className={totalPnLAmount >= 0 ? "text-green-500" : "text-red-500"} />
                <span className={`font-semibold ${totalPnLAmount >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {totalPnLAmount >= 0 ? '+' : ''}{pnlPercentChange}%
                </span>
              </div>
            </div>
            <div className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">${stats.totalPnL.toLocaleString()}</div>
            <div className="h-40 md:h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pnlHistory.length > 0 ? pnlHistory : [{ name: '00:00', value: 0 }]} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(v) => `$${v}`} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    fill="url(#colorPnl)"
                  />
                </LineChart>
              </ResponsiveContainer>
              {stats.totalPnL > 0 && (
                <div className={`absolute top-1 md:top-2 right-4 md:right-8 ${stats.totalPnL >= 0 ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded`}>
                  ${stats.totalPnL.toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent trades */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="text-base font-semibold mb-4">Recent trades</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">Client ID</TableHead>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">Instrument</TableHead>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">Qty</TableHead>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">Buy/Sell</TableHead>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">P&L</TableHead>
                  <TableHead className="text-gray-600 font-medium text-xs md:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.map((trade, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-900 text-xs md:text-sm">{trade.clientId || trade.client}</TableCell>
                    <TableCell className="text-gray-900 text-xs md:text-sm">{trade.instrument}</TableCell>
                    <TableCell className="text-gray-900 text-xs md:text-sm">{trade.qty}</TableCell>
                    <TableCell>
                      <span className={`text-xs md:text-sm font-medium ${trade.type === 'Buy' || trade.type === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-900 text-xs md:text-sm">
                      <span className={trade.pnl?.toString().includes('-') ? 'text-red-500' : 'text-green-500'}>
                        {trade.pnl}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} className="md:size-[18px]" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}