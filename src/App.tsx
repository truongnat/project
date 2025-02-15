import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "./components/ui/toast"
import { Toaster } from "./components/ui/toaster"
import { SoldierForm } from "./components/SoldierForm"
import { useSoldierData } from "./hooks/useSoldierData"
import { Soldier } from "./types/soldier"


function App() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
  const { toast } = useToast()

  const {
    soldiers,
    loading,
    error,
    addSoldier,
    updateSoldier,
    deleteSoldier
  } = useSoldierData()

  const handleSubmit = async (values: Soldier) => {
    try {
      if (selectedSoldier) {
        await updateSoldier(selectedSoldier.id, values)
        toast({
          title: "Thành công",
          description: "Cập nhật thông tin thành công",
        })
      } else {
        await addSoldier(values)
        toast({
          title: "Thành công",
          description: "Thêm mới thành công",
        })
      }
      setIsFormVisible(false)
      setSelectedSoldier(null)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSoldier(id)
      toast({
        title: "Thành công",
        description: "Xóa thành công",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold">
            Hệ thống Quản lý Thông tin Chiến sĩ
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <div className="mb-6">
          <Button onClick={() => setIsFormVisible(true)}>
            Thêm chiến sĩ mới
          </Button>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <SoldierForm
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormVisible(false)
                  setSelectedSoldier(null)
                }}
              />
            </div>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}

export default App