import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Soldier } from "@/types/soldier"

interface SoldierListProps {
  soldiers: Soldier[]
  onEdit: (soldier: Soldier | null) => void
  onDelete: (id: string) => void
}

export function SoldierList({ soldiers, onEdit, onDelete }: SoldierListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Họ và tên</TableHead>
          <TableHead>Ngày sinh</TableHead>
          <TableHead>Chức vụ</TableHead>
          <TableHead>Đơn vị</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {soldiers.map((soldier) => (
          <TableRow key={soldier.id}>
            <TableCell>{soldier.name}</TableCell>
            <TableCell>
              {format(new Date(soldier.dateOfBirth), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>{soldier.position}</TableCell>
            <TableCell>{soldier.unit}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(soldier)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(soldier.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 