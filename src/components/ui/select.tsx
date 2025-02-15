import * as React from "react"

interface SelectProps {
  onValueChange: (value: string) => void
  children: React.ReactNode
}

export function Select({ onValueChange, children }: SelectProps) {
  return <div>{children}</div>
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <button className="flex w-full items-center justify-between rounded-md border p-2">{children}</button>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-sm">{placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="absolute mt-1 w-full rounded-md border bg-white p-1">{children}</div>
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100" data-value={value}>
      {children}
    </div>
  )
} 