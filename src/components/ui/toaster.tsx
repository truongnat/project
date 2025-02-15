import { Toast, ToastProvider } from "./toast"

export function Toaster() {
  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  )
} 