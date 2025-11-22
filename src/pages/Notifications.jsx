import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, Plus, MoreVertical, Filter } from 'lucide-react'
import { useState } from 'react'
import AddNotificationModal from '@/components/AddNotificationModal'

export default function Notifications() {
  const [showAddNotification, setShowAddNotification] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const notificationsData = [
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: '' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
    { id: 'Client #102634', recipient: 'Marshal', type: 'Trade alert', message: 'Order Rejected - Insufficient Margin', status: 'Unread' },
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Notifications</h1>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          {/* Mobile Filter Toggle */}
          <div className="sm:hidden flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
            
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setShowAddNotification(true)}
              size="sm"
            >
              <Plus size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          </div>

          {/* Filters and Button */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:flex items-center justify-between mb-6 flex-col sm:flex-row gap-4`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              {/* Type Filter */}
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between sm:justify-start gap-2">
                Type
                <ChevronDown size={16} />
              </button>

              {/* Role Filter */}
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between sm:justify-start gap-2">
                Role
                <ChevronDown size={16} />
              </button>

              {/* Date range Filter */}
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between sm:justify-start gap-2">
                Date range
                <ChevronDown size={16} />
              </button>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-9 w-full bg-white border-gray-200"
                />
              </div>
            </div>

            {/* Create Notification button - Desktop */}
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white hidden sm:flex"
              onClick={() => setShowAddNotification(true)}
            >
              <Plus size={18} className="mr-2" />
              Create Notification
            </Button>
          </div>

          {/* Table Header */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 font-medium">Notification ID</TableHead>
                  <TableHead className="text-gray-600 font-medium">Recipient</TableHead>
                  <TableHead className="text-gray-600 font-medium">Type</TableHead>
                  <TableHead className="text-gray-600 font-medium">Message</TableHead>
                  <TableHead className="text-gray-600 font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationsData.map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-900">{notification.id}</TableCell>
                    <TableCell className="text-gray-900">{notification.recipient}</TableCell>
                    <TableCell className="text-gray-900">{notification.type}</TableCell>
                    <TableCell className="text-gray-900">{notification.message}</TableCell>
                    <TableCell>
                      {notification.status && (
                        <span className="text-sm font-medium text-green-500">
                          {notification.status}
                        </span>
                      )}
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
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {notificationsData.map((notification, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.id}</p>
                      <p className="text-sm text-gray-600">{notification.recipient}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm text-gray-900">{notification.type}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Message:</span>
                      <p className="text-sm text-gray-900 mt-1">{notification.message}</p>
                    </div>
                    
                    {notification.status && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className="text-sm font-medium text-green-500">
                          {notification.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Notification Modal */}
      <AddNotificationModal 
        open={showAddNotification}
        onOpenChange={setShowAddNotification}
      />
    </div>
  )
}