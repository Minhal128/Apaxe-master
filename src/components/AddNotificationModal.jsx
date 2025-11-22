import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { X } from 'lucide-react'

export default function AddNotificationModal({ open, onOpenChange }) {
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
              placeholder=""
            />
          </div>

          {/* Message body */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Message body</label>
            <Textarea
              className="min-h-[100px]"
              placeholder=""
            />
          </div>

          {/* Category and Recipients */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Category</label>
              <Select defaultValue="demo">
                <option value="demo">Demo</option>
                <option value="live">Live</option>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Recipients</label>
              <Select defaultValue="demo">
                <option value="demo">Demo</option>
                <option value="all">All</option>
              </Select>
            </div>
          </div>

          {/* Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-11">
            Send notification
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
