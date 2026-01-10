import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, Plus, MoreVertical, Filter, Loader2, Trash2, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import AddNotificationModal from '@/components/AddNotificationModal'
import { notificationApi, clientApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function Notifications() {
  const [showAddNotification, setShowAddNotification] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [clients, setClients] = useState([])
  const [stats, setStats] = useState({ total: 0, unread: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetchNotifications()
    fetchClients()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const [notifResponse, statsResponse] = await Promise.all([
        notificationApi.getNotifications(),
        notificationApi.getNotificationStats()
      ])

      const notifData = notifResponse.data.data?.notifications || notifResponse.data.data || []
      setNotifications(Array.isArray(notifData) ? notifData : [])

      if (statsResponse.data.data) {
        setStats(statsResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      // If API fails, show empty state
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await clientApi.getClients({ limit: 100 })
      const clientsData = response.data.data?.clients || []
      setClients(clientsData)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id)
      setNotifications(prev => prev.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      ))
      toast.success('Notification marked as read')
    } catch (error) {
      console.error('Error marking as read:', error)
      toast.error('Failed to mark as read')
    }
  }

  const handleDelete = async (id) => {
    try {
      await notificationApi.deleteNotification(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
      toast.success('Notification deleted')
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('Failed to delete notification')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      toast.success('All notifications marked as read')
    } catch (error) {
      console.error('Error marking all as read:', error)
      toast.error('Failed to mark all as read')
    }
  }

  const handleNotificationCreated = () => {
    fetchNotifications()
    setShowAddNotification(false)
  }

  // Filter notifications
  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = !searchTerm ||
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !typeFilter || n.type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusColor = (isRead) => {
    return isRead ? 'text-gray-400' : 'text-green-500'
  }

  const getTypeLabel = (type) => {
    const types = {
      ORDER_PLACED: 'Order Placed',
      ORDER_FILLED: 'Order Filled',
      ORDER_CANCELLED: 'Order Cancelled',
      ORDER_REJECTED: 'Order Rejected',
      MARGIN_CALL: 'Margin Call',
      POSITION_SQUARED_OFF: 'Position Squared Off',
      PROFIT_SHARE: 'Profit Share',
      SYSTEM_ALERT: 'System Alert',
      MARKET_ALERT: 'Market Alert',
      TRADE: 'Trade',
      MARGIN: 'Margin',
      PARTIALLY_FILLED: 'Partially Filled'
    }
    return types[type] || type || 'General'
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
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
              <select
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="SYSTEM_ALERT">System Alert</option>
                <option value="MARKET_ALERT">Market Alert</option>
                <option value="TRADE">Trade</option>
                <option value="MARGIN">Margin</option>
                <option value="MARGIN_CALL">Margin Call</option>
                <option value="ORDER_PLACED">Order Placed</option>
                <option value="ORDER_FILLED">Order Filled</option>
              </select>

              {/* Mark All Read Button */}
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="w-full sm:w-auto"
                size="sm"
              >
                <Check size={16} className="mr-2" />
                Mark All Read
              </Button>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Notifications {stats.unread > 0 && <span className="text-green-500">({stats.unread} unread)</span>}
            </h3>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications found</p>
            </div>
          )}

          {/* Desktop Table */}
          {!loading && filteredNotifications.length > 0 && (
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium">Title</TableHead>
                    <TableHead className="text-gray-600 font-medium">Type</TableHead>
                    <TableHead className="text-gray-600 font-medium">Message</TableHead>
                    <TableHead className="text-gray-600 font-medium">Date</TableHead>
                    <TableHead className="text-gray-600 font-medium">Status</TableHead>
                    <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification, index) => (
                    <TableRow key={notification.id || index}>
                      <TableCell className="text-gray-900 font-medium">{notification.title || 'Notification'}</TableCell>
                      <TableCell className="text-gray-900">{getTypeLabel(notification.type)}</TableCell>
                      <TableCell className="text-gray-900 max-w-xs truncate">{notification.message}</TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getStatusColor(notification.isRead)}`}>
                          {notification.isRead ? 'Read' : 'Unread'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-blue-500 hover:text-blue-700"
                              title="Mark as read"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Mobile Cards */}
          {!loading && filteredNotifications.length > 0 && (
            <div className="sm:hidden space-y-4">
              {filteredNotifications.map((notification, index) => (
                <Card key={notification.id || index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{notification.title || 'Notification'}</p>
                        <p className="text-xs text-gray-500">
                          {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="text-sm text-gray-900">{getTypeLabel(notification.type)}</span>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Message:</span>
                        <p className="text-sm text-gray-900 mt-1">{notification.message}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`text-sm font-medium ${getStatusColor(notification.isRead)}`}>
                          {notification.isRead ? 'Read' : 'Unread'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Notification Modal */}
      <AddNotificationModal
        open={showAddNotification}
        onOpenChange={setShowAddNotification}
        onNotificationSent={fetchNotifications}
      />
    </div>
  )
}