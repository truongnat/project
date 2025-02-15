import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Soldier } from "@/types/soldier"

interface SoldierFormProps {
  soldier?: Soldier | null
  onSubmit: (data: Soldier) => void
  onCancel: () => void
}

export function SoldierForm({ soldier, onSubmit, onCancel }: SoldierFormProps) {
  const { register, handleSubmit } = useForm<Soldier>({
    defaultValues: soldier || {
      enlistmentDate: "2025-02-01",
      position: "Chiến sĩ",
      rank: "B2",
      ethnicity: "Kinh",
      religion: "Không",
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6 p-4 border rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Họ tên</label>
          <Input {...register("name")} required />
        </div>
        
        <div>
          <label>Ngày sinh</label>
          <Input type="date" {...register("dateOfBirth")} required />
        </div>

        <div>
          <label>Ngày nhập ngũ</label>
          <Input type="date" {...register("enlistmentDate")} required />
        </div>

        <div>
          <label>Chức vụ</label>
          <Input {...register("position")} required />
        </div>

        <div>
          <label>Cấp bậc</label>
          <Input {...register("rank")} required />
        </div>

        <div>
          <label>Đơn vị</label>
          <Input {...register("unit")} required />
        </div>

        <div>
          <label>Văn hóa</label>
          <Input {...register("education")} required />
        </div>

        <div>
          <label>Đảng/Đoàn</label>
          <Select onValueChange={(value) => {
            register("politicalStatus").onChange({ target: { value } })
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Đảng">Đảng</SelectItem>
              <SelectItem value="Đoàn">Đoàn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Dân tộc</label>
          <Input {...register("ethnicity")} required />
        </div>

        <div>
          <label>Tôn giáo</label>
          <Input {...register("religion")} required />
        </div>

        <div>
          <label>Quê quán</label>
          <Input {...register("hometown")} required />
        </div>

        <div>
          <label>Họ tên bố, mẹ hoặc vợ</label>
          <Textarea {...register("familyInfo")} required />
        </div>

        <div>
          <label>Ghi chú</label>
          <Textarea {...register("notes")} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {soldier ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
    </form>
  )
} 