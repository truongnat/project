import * as React from "react"

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({ children }: PopoverProps) {
  return <div className="relative">{children}</div>
}

export function PopoverTrigger({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean }) {
  return <div {...props}>{children}</div>
}

export function PopoverContent({ 
  children,
  align = "center",
  className,
  ...props
}: {
  children: React.ReactNode
  align?: "start" | "center" | "end"
  className?: string
}) {
  return (
    <div className={`absolute mt-2 z-50 ${className}`} {...props}>
      {children}
    </div>
  )
} 