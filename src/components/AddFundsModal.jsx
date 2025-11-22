import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Lock } from 'lucide-react'

export default function AddFundsModal({ open, onOpenChange, client }) {
  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[340px] p-0">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Add funds</h2>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* User Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Kabiru+Michael&background=4a5568&color=fff"
                  alt="Kabiru Michael"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Kabiru Michael</div>
                <div className="text-xs text-gray-500">User | ID: #4457584</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">₹200k</div>
              <div className="text-xs text-gray-500">Available balance</div>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2 block">Enter funds amount</label>
            <div className="relative">
              <Input
                type="text"
                className="pr-10 h-11"
                placeholder="Enter amount"
              />
              <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-11">
            + Add funds
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
