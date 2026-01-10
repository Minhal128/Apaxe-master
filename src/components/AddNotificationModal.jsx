import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { X } from 'lucide-react'
import { notificationApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function AddNotificationModal({ open, onOpenChange, onNotificationSent }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('SYSTEM_ALERT')
  const [recipientType, setRecipientType] = useState('all')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }

    setLoading(true)
    try {
      // Send as announcement (to all users)
      await notificationApi.sendAnnouncement({
        title: title.trim(),
        message: message.trim(),
        type: type
      })
      
      toast.success('Notification sent successfully')
      
      // Reset form
      setTitle('')
      setMessage('')
      setType('SYSTEM_ALERT')
      setRecipientType('all')
      
      // Close modal and refresh notifications
      onOpenChange(false)
      if (onNotificationSent) {
        onNotificationSent()
      }
    } catch (error) {
      console.error('Error sending notification:', error)
      toast.error(error.response?.data?.message || 'Failed to send notification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Add notification</h2>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-4">
          {/* Title */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Title</label>
            <Input
              type="text"
              className="h-11"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Message body */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Message body</label>
            <Textarea
              className="min-h-[100px]"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Category and Recipients */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Type</label>
              <Select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
              >
                <option value="SYSTEM_ALERT">System Alert</option>
                <option value="MARKET_ALERT">Market Alert</option>
                <option value="TRADE">Trade</option>
                <option value="MARGIN">Margin</option>
                <option value="MARGIN_CALL">Margin Call</option>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Recipients</label>
              <Select 
                value={recipientType} 
                onChange={(e) => setRecipientType(e.target.value)}
              >
                <option value="all">All Users</option>
              </Select>
            </div>
          </div>

          {/* Button */}
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white h-11"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send notification'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
