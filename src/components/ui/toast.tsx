import * as React from "react"
import { createContext, useContext, useState } from "react"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast: (toast) => setToasts(prev => [...prev, { ...toast, id: Math.random().toString() }]),
      removeToast: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  
  return {
    toast: context.addToast,
    dismiss: context.removeToast
  }
}

export function Toast() {
  const context = useContext(ToastContext)
  if (!context) return null

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      {context.toasts.map(toast => (
        <div key={toast.id} className={`bg-white p-4 rounded shadow-lg ${
          toast.variant === "destructive" ? "border-red-500" : "border-gray-200"
        } border`}>
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && <div className="text-sm">{toast.description}</div>}
        </div>
      ))}
    </div>
  )
} 