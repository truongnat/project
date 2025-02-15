import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "./components/ui/toast"
import { Toaster } from "./components/ui/toaster"
import { SoldierList } from "./components/SoldierList"
import { SoldierForm } from "./components/SoldierForm"
import { AppendixView } from "./components/AppendixView"
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
    fetchSoldiers, 
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

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="list">Danh sách chiến sĩ</TabsTrigger>
            <TabsTrigger value="appendices">Phụ lục</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {loading ? (
              <div className="text-center py-4">Đang tải...</div>
            ) : error ? (
              <div className="text-center text-destructive py-4">
                Có lỗi xảy ra khi tải dữ liệu
              </div>
            ) : (
              <SoldierList 
                soldiers={soldiers}
                onEdit={(soldier) => setSelectedSoldier(soldier)}
                onDelete={handleDelete}
              />
            )}
          </TabsContent>

          <TabsContent value="appendices">
            <Tabs defaultValue="1" orientation="vertical" className="w-full">
              <div className="grid grid-cols-5 gap-6">
                <TabsList className="flex flex-col h-[400px] overflow-y-auto">
                  {Array.from({ length: 20 }, (_, i) => (
                    <TabsTrigger key={i + 1} value={String(i + 1)}>
                      Phụ lục {i + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="col-span-4">
                  {Array.from({ length: 20 }, (_, i) => (
                    <TabsContent key={i + 1} value={String(i + 1)}>
                      <AppendixView 
                        type={i + 1} 
                        soldiers={soldiers}
                      />
                    </TabsContent>
                  ))}
                </div>
              </div>
            </Tabs>
          </TabsContent>
        </Tabs>

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