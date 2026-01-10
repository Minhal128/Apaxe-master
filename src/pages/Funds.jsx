import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Search, ChevronDown, MoreVertical } from 'lucide-react'
import { fundsApi } from '@/lib/api'
import FundsSkeleton from '@/components/FundsSkeleton'
import { toast } from 'react-toastify'

export default function Funds() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFunds()
  }, [])

  const fetchFunds = async () => {
    try {
      setIsLoading(true)
      const response = await fundsApi.getFundsOverview()
      if (response.data && response.data.data) {
        setData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching funds:', error)
      toast.error('Failed to load funds data')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FundsSkeleton />

  const fundsList = data?.funds || []
  const summary = data?.summary || {
    totalCreditDistribution: '0',
    totalDebitProcessed: '0',
    totalBalance: '$0',
    averageResponse: '0%'
  }

  const avgUtilization = parseInt(summary.averageResponse) || 0;
  const donutData = [
    { name: 'Total Exposure', value: avgUtilization, color: '#6366f1' },
    { name: 'Total Credit available', value: Math.max(0, 100 - avgUtilization), color: '#8b5cf6' },
    { name: 'Margin call', value: avgUtilization > 80 ? 15 : 5, color: '#d1d5db' },
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Credit Distribution */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Credit Distribution</div>
            <div className="text-2xl sm:text-3xl font-semibold mb-4">{summary.totalCreditDistribution}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 20 }, { v: 22 }, { v: 21 }, { v: 23 }, { v: 25 }, { v: 24 }, { v: 26 }, { v: 28 }, { v: 27 }, { v: 29 }, { v: 30 }, { v: 28 }, { v: 30 }, { v: 32 }, { v: 31 }, { v: 33 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Debit Processed */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Debit Processed</div>
            <div className="text-2xl sm:text-3xl font-semibold mb-4">{summary.totalDebitProcessed}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 100 }, { v: 110 }, { v: 105 }, { v: 115 }, { v: 120 }, { v: 118 }, { v: 122 }, { v: 125 }, { v: 123 }, { v: 127 }, { v: 130 }, { v: 128 }, { v: 132 }, { v: 135 }, { v: 133 }, { v: 124 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Balance */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Balance</div>
            <div className="text-2xl sm:text-3xl font-semibold mb-4">{summary.totalBalance}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 80 }, { v: 90 }, { v: 85 }, { v: 95 }, { v: 100 }, { v: 98 }, { v: 102 }, { v: 105 }, { v: 103 }, { v: 107 }, { v: 110 }, { v: 115 }, { v: 118 }, { v: 120 }, { v: 122 }, { v: 123 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Average Response */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="text-sm text-gray-500 mb-1">Average Response</div>
            <div className="text-2xl sm:text-3xl font-semibold mb-4">{summary.averageResponse}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 55 }, { v: 57 }, { v: 56 }, { v: 58 }, { v: 60 }, { v: 59 }, { v: 61 }, { v: 62 }, { v: 61.5 }, { v: 63 }, { v: 64 }, { v: 63.5 }, { v: 64.5 }, { v: 65.5 }, { v: 65 }, { v: 65 }]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="flex gap-2 sm:gap-3">
              {/* Debit Filter */}
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                Debit
                <ChevronDown size={16} />
              </button>

              {/* Credit Filter */}
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                Credit
                <ChevronDown size={16} />
              </button>

              {/* Date range Filter */}
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                Date range
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search"
                className="pl-9 bg-white border-gray-200 w-full"
              />
            </div>
          </div>

          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Client ID</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Available Balance</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Used Margin</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Locked Funds</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Credit Limit</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Total Balance</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Last transaction</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-gray-600 font-medium text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundsList.map((fund, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.id}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.balance}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.margin}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.locked}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.limit}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.total}</TableCell>
                      <TableCell className="text-gray-900 text-xs sm:text-sm">{fund.date}</TableCell>
                      <TableCell>
                        <span
                          className={`text-xs sm:text-sm font-medium ${parseFloat(fund.status) >= 70
                            ? 'text-green-500'
                            : parseFloat(fund.status) >= 60
                              ? 'text-red-500'
                              : 'text-blue-500'
                            }`}
                        >
                          {fund.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donut Chart */}
      <Card className="w-full max-w-[480px] mx-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full justify-center">
              {donutData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <div className="text-xs text-gray-600">
                    {item.name}
                    <div className="font-semibold text-gray-900">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}