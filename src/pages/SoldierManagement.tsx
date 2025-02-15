import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { SoldierList } from "../components/SoldierList"
import { SoldierForm } from "../components/SoldierForm"
import { AppendixView } from "../components/AppendixView"
import { useSoldierData } from "../hooks/useSoldierData"
import { Soldier } from "../models/Soldier"

export function SoldierManagement() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
  const { toast } = useToast()
  
  const { 
    soldiers, 
    loading, 
    error, 
    fetchSoldiers, 
    addSoldier, 
    updateSoldier 
  } = useSoldierData()

  useEffect(() => {
    fetchSoldiers()
  }, [fetchSoldiers])

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

  return (
    <div className="container mx-auto py-6">
      <Button 
        onClick={() => setIsFormVisible(true)}
        className="mb-6"
      >
        Thêm chiến sĩ mới
      </Button>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Danh sách chiến sĩ</TabsTrigger>
          <TabsTrigger value="appendix1">Phụ lục 1 - Đảng viên</TabsTrigger>
          {/* Add more tab triggers */}
        </TabsList>

        <TabsContent value="list">
          <SoldierList 
            soldiers={soldiers}
            onEdit={setSelectedSoldier}
            onDelete={(id) => {/* implement delete */}}
          />
        </TabsContent>

        <TabsContent value="appendix1">
          <AppendixView type={1} soldiers={soldiers} />
        </TabsContent>
        {/* Add more tab content */}
      </Tabs>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg w-full max-w-2xl">
            <SoldierForm
              initialValues={selectedSoldier || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormVisible(false)
                setSelectedSoldier(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
} 