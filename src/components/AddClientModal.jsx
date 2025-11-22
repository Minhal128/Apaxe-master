import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

export default function AddClientModal({ open, onOpenChange }) {
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
          {/* Full name */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Full name</label>
            <Input
              type="text"
              className="h-11"
              placeholder=""
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Email Address</label>
            <Input
              type="email"
              className="h-11"
              placeholder=""
            />
          </div>

          {/* Phone number and Commission */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Phone number</label>
              <Input
                type="tel"
                className="h-11"
                placeholder=""
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Commission</label>
              <Input
                type="text"
                className="h-11"
                placeholder=""
              />
            </div>
          </div>

          {/* Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-11">
            Add client
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
