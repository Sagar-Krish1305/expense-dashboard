import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

function Progress({
  className,
  value,
  isOverflow,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { isOverflow : boolean}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        `bg-(--total-progress-color) relative h-2 w-full overflow-hidden rounded-full ${isOverflow ? "bg-red-600" : ''}`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`bg-(--completed-progress-color) h-full w-full flex-1 transition-all ${isOverflow ? 'bg-red-600' : ''}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
