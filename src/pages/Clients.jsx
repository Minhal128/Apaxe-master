import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { Search, ChevronDown, Plus, MoreVertical, Filter } from 'lucide-react'
import { useState } from 'react'
import ClientDetailsModal from '@/components/ClientDetailsModal'
import AddClientModal from '@/components/AddClientModal'

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientDetails, setShowClientDetails] = useState(false)
  const [showAddClient, setShowAddClient] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleClientClick = (client) => {
    setSelectedClient(client)
    setShowClientDetails(true)
  }

  const handleAddClient = () => {
    setShowAddClient(true)
  }

  const clientsData = [
    {
      id: 'CLT-001',
      name: 'Amit Sharma',
      market: 'NSE, MCX, Forex',
      balance: '$2,50,000',
      margin: '$1,20,000',
      exposure: '$5,00,000',
      pnl: '$120,098',
      status: 'Active',
    },
    {
      id: 'CLT-002',
      name: 'Priya Patel',
      market: 'NSE, MCX, Forex',
      balance: '$2,50,000',
      margin: '$1,20,000',
      exposure: '$5,00,000',
      pnl: '$120,098',
      status: 'Frozen',
    },
    {
      id: 'CLT-003',
      name: 'Raj Kumar',
      market: 'NSE, MCX, Forex',
      balance: '$2,50,000',
      margin: '$1,20,000',
      exposure: '$5,00,000',
      pnl: '$120,098',
      status: 'Margin',
    },
    {
      id: 'CLT-004',
      name: 'Sneha Singh',
      market: 'NSE, MCX, Forex',
      balance: '$2,50,000',
      margin: '$1,20,000',
      exposure: '$5,00,000',
      pnl: '$120,098',
      status: 'Margin',
    },
    {
      id: 'CLT-005',
      name: 'Vikram Joshi',
      market: 'NSE, MCX, Forex',
      balance: '$2,50,000',
      margin: '$1,20,000',
      exposure: '$5,00,000',
      pnl: '$120,098',
      status: 'Active',
    },
  ]

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Clients</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total Clients */}
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Total Clients</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">23k</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:20},{v:22},{v:21},{v:23},{v:25},{v:24},{v:26},{v:28},{v:27},{v:29},{v:30},{v:28},{v:30},{v:32},{v:31},{v:33}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Active Clients</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">124</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:100},{v:110},{v:105},{v:115},{v:120},{v:118},{v:122},{v:125},{v:123},{v:127},{v:130},{v:128},{v:132},{v:135},{v:133},{v:124}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Margin call */}
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Margin call</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">$123k</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:80},{v:90},{v:85},{v:95},{v:100},{v:98},{v:102},{v:105},{v:103},{v:107},{v:110},{v:115},{v:118},{v:120},{v:122},{v:123}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Frozen call */}
        <Card className="w-full">
          <CardContent className="p-4 lg:p-6">
            <div className="text-sm text-gray-500 mb-1">Frozen call</div>
            <div className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4">$400k</div>
            <div className="h-10 lg:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{v:300},{v:320},{v:310},{v:330},{v:350},{v:340},{v:360},{v:370},{v:365},{v:375},{v:380},{v:385},{v:390},{v:395},{v:398},{v:400}]}>
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="w-full">
        <CardContent className="p-4 lg:p-6">
          {/* Filters and Add Button */}
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
                {/* Role Filter */}
                <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                  Role
                  <ChevronDown size={16} />
                </button>

                {/* Market Filter */}
                <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                  Market
                  <ChevronDown size={16} />
                </button>

                {/* Date range Filter */}
                <button className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between lg:justify-start gap-2">
                  Date range
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Add clients button */}
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white w-full lg:w-auto mt-2 lg:mt-0"
              onClick={handleAddClient}
            >
              <Plus size={18} className="mr-2" />
              Add clients
            </Button>
          </div>

          {/* Table Container with horizontal scroll */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] lg:min-w-0">
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-3">
                {clientsData.map((client, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleClientClick(client)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.id}</div>
                        </div>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded ${
                            client.status === 'Active'
                              ? 'text-green-500 bg-green-50'
                              : client.status === 'Frozen'
                              ? 'text-red-500 bg-red-50'
                              : 'text-blue-500 bg-blue-50'
                          }`}
                        >
                          {client.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Market</div>
                          <div className="font-medium">{client.market}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Balance</div>
                          <div className="font-medium">{client.balance}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Margin</div>
                          <div className="font-medium">{client.margin}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">P&L</div>
                          <div className="font-medium">{client.pnl}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <div className="text-gray-500 text-sm">Exposure</div>
                          <div className="font-medium">{client.exposure}</div>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-gray-600 p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle actions menu
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <Table className="hidden lg:table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium">Client ID</TableHead>
                    <TableHead className="text-gray-600 font-medium">Client Name</TableHead>
                    <TableHead className="text-gray-600 font-medium">Market Access</TableHead>
                    <TableHead className="text-gray-600 font-medium">Available Balance</TableHead>
                    <TableHead className="text-gray-600 font-medium">Used Margin</TableHead>
                    <TableHead className="text-gray-600 font-medium">Exposure</TableHead>
                    <TableHead className="text-gray-600 font-medium">Net P&L</TableHead>
                    <TableHead className="text-gray-600 font-medium">Status</TableHead>
                    <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientsData.map((client, index) => (
                    <TableRow 
                      key={index}
                      onClick={() => handleClientClick(client)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell className="text-gray-900">{client.id}</TableCell>
                      <TableCell className="text-gray-900">{client.name}</TableCell>
                      <TableCell className="text-gray-900">{client.market}</TableCell>
                      <TableCell className="text-gray-900">{client.balance}</TableCell>
                      <TableCell className="text-gray-900">{client.margin}</TableCell>
                      <TableCell className="text-gray-900">{client.exposure}</TableCell>
                      <TableCell className="text-gray-900">{client.pnl}</TableCell>
                      <TableCell>
                        <span
                          className={`text-sm font-medium ${
                            client.status === 'Active'
                              ? 'text-green-500'
                              : client.status === 'Frozen'
                              ? 'text-red-500'
                              : 'text-blue-500'
                          }`}
                        >
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button 
                          className="text-gray-400 hover:text-gray-600 p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle actions menu
                          }}
                        >
                          <MoreVertical size={18} />
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

      {/* Modals */}
      <ClientDetailsModal 
        open={showClientDetails} 
        onOpenChange={setShowClientDetails}
        client={selectedClient}
      />
      <AddClientModal 
        open={showAddClient}
        onOpenChange={setShowAddClient}
      />
    </div>
  )
}