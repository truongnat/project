import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
}

export function Tabs({ defaultValue, children, className, orientation }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue)
  
  return (
    <div className={className} data-orientation={orientation}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange: setValue })
        }
        return child
      })}
    </div>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  return <button className={className} data-value={value}>{children}</button>
}

export function TabsContent({ value, children }: TabsContentProps) {
  return <div data-value={value}>{children}</div>
}