import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, min = 0, max = 100, value = 50, onChange, ...props }, ref) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-full">
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(parseInt(e.target.value))}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider",
          className
        )}
        style={{
          background: `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }
