import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { userApi } from '@/lib/api'
import { toast } from 'react-toastify'

export default function AddClientModal({ open, onOpenChange, onClientAdded }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    balance: 0
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.firstName.trim()) {
      toast.error('Please enter first name')
      return
    }
    if (!formData.lastName.trim()) {
      toast.error('Please enter last name')
      return
    }
    if (!formData.email.trim()) {
      toast.error('Please enter an email')
      return
    }
    if (!formData.password.trim()) {
      toast.error('Please enter a password')
      return
    }

    setLoading(true)
    try {
      await userApi.createUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        role: 'CLIENT',
        balance: parseFloat(formData.balance) || 0
      })
      
      toast.success('Client created successfully')
      setFormData({ firstName: '', lastName: '', email: '', password: '', phone: '', balance: 0 })
      onOpenChange(false)
      if (onClientAdded) onClientAdded()
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error(error.response?.data?.message || 'Failed to create client')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[340px] p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Add client</h2>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-4">
          {/* First name */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">First name</label>
            <Input
              type="text"
              className="h-11"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>

          {/* Last name */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Last name</label>
            <Input
              type="text"
              className="h-11"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Email Address</label>
            <Input
              type="email"
              className="h-11"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Password</label>
            <Input
              type="password"
              className="h-11"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>

          {/* Phone number and Balance */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Phone number</label>
              <Input
                type="tel"
                className="h-11"
                placeholder="Optional"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Initial Balance</label>
              <Input
                type="number"
                className="h-11"
                placeholder="0"
                value={formData.balance}
                onChange={(e) => handleInputChange('balance', e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white h-11"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add client'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
