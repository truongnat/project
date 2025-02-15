import { Soldier } from "@/types/soldier";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

interface AppendixViewProps {
  type: number; // 1-20 for each appendix
  soldiers: Soldier[];
}

// Helper function to get appendix title
const getAppendixTitle = (type: number): string => {
  const titles: { [key: number]: string } = {
    1: "Đảng viên",
    2: "Bố mẹ là Đảng viên",
    3: "Dân tộc ít người",
    4: "Tôn giáo",
    5: "Trình độ đại học cao đẳng trung cấp",
    6: "Có vợ con",
    7: "Ly hôn",
    8: "Bố hoặc mẹ chết",
    9: "Bản thân vi phạm pháp luật",
    10: "Có người thân vi phạm pháp luật",
    11: "Có hình xăm trên người",
    12: "Vay nợ app",
    13: "Thân nhân ở nước ngoài",
    14: "Đã từng đi nước ngoài",
    15: "Sử dụng ma túy",
    16: "Gia đình chính sách",
    17: "Bệnh hiểm nghèo",
    18: "Hoàn cảnh khó khăn",
    19: "Bố mẹ là bộ đội, cán bộ",
    20: "Tuyển lẻ"
  }
  return titles[type] || "Unknown Appendix"
}

// Helper function to get table columns based on appendix type
const getColumns = (type: number) => {
  const commonColumns = [
    { key: "fullName", label: "Họ và tên" },
    { key: "dateOfBirth", label: "Ngày sinh" },
    { key: "position", label: "Chức vụ" },
    { key: "unit", label: "Đơn vị" },
    { key: "hometown", label: "Quê quán" },
    { key: "currentAddress", label: "Trú quán" },
  ]

  const appendixSpecificColumns: { [key: number]: Array<{ key: string; label: string }> } = {
    1: [
      ...commonColumns,
      { key: "partyJoinDate", label: "Ngày vào đảng" },
    ],
    2: [
      ...commonColumns,
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
    ],
    3: [
      ...commonColumns,
      { key: "ethnicity", label: "Dân tộc" },
    ],
    4: [
      ...commonColumns,
      { key: "religion", label: "Tôn giáo" },
    ],
    5: [
      { key: "fullName", label: "Họ và tên" },
      { key: "dateOfBirth", label: "Ngày sinh" },
      { key: "education.level", label: "Trình độ đào tạo" },
      { key: "education.type", label: "Hệ đào tạo" },
      { key: "education.schoolName", label: "Tên trường" },
      { key: "education.major", label: "Ngành học" },
    ],
    6: [
      { key: "fullName", label: "Họ và tên" },
      { key: "dateOfBirth", label: "Ngày sinh" },
      { key: "hometown", label: "Quê quán" },
      { key: "marriageStatus.spouseName", label: "Họ tên vợ" },
      { key: "marriageStatus.marriageDate", label: "Thời gian kết hôn" },
    ],
    7: [
      { key: "fullName", label: "Họ và tên" },
      { key: "position", label: "Chức vụ" },
      { key: "unit", label: "Đơn vị" },
      { key: "hometown", label: "Quê quán" },
      { key: "marriageStatus.livingWith", label: "Đang ở cùng ai" },
    ],
    8: [
      { key: "fullName", label: "Họ và tên" },
      { key: "position", label: "Chức vụ" },
      { key: "unit", label: "Đơn vị" },
      { key: "hometown", label: "Quê quán" },
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
    ],
    9: [
      { key: "fullName", label: "Họ và tên" },
      { key: "dateOfBirth", label: "Ngày sinh" },
      { key: "unit", label: "Đơn vị" },
      { key: "hometown", label: "Quê quán" },
      { key: "legalIssues.personalViolations.date", label: "Thời gian" },
      { key: "legalIssues.personalViolations.reason", label: "Lý do và hình thức xử phạt" },
      { key: "legalIssues.personalViolations.verificationResult", label: "Kết quả xác minh" },
    ],
    10: [
      { key: "fullName", label: "Họ và tên" },
      { key: "dateOfBirth", label: "Ngày sinh" },
      { key: "unit", label: "Đơn vị" },
      { key: "hometown", label: "Quê quán" },
      { key: "currentAddress", label: "Trú quán" },
      { key: "legalIssues.familyViolations.relative", label: "Thân nhân vi phạm" },
      { key: "legalIssues.familyViolations.violation", label: "Nội dung vi phạm" },
      { key: "legalIssues.familyViolations.sentence", label: "Án phạt" },
    ],
    11: [
      ...commonColumns,
      { key: "tattoos.description", label: "Mô tả hình xăm" },
    ],
    12: [
      ...commonColumns,
      { key: "appLoans.lender", label: "Địa chỉ vay" },
      { key: "appLoans.amount", label: "Số tiền vay" },
      { key: "appLoans.remainingDebt", label: "Hiện nợ còn" },
      { key: "appLoans.purpose", label: "Mục đích vay" },
    ],
    13: [
      ...commonColumns,
      { key: "foreignRelatives.relativeName", label: "Họ tên thân nhân" },
    ],
    14: [
      { key: "fullName", label: "Họ và tên" },
      { key: "dateOfBirth", label: "Ngày sinh" },
      { key: "ethnicity", label: "Dân tộc" },
      { key: "religion", label: "Tôn giáo" },
      { key: "unit", label: "Đơn vị" },
      { key: "hometown", label: "Quê quán" },
      { key: "foreignTravel.country", label: "Nước đến" },
      { key: "foreignTravel.visa", label: "Visa" },
      { key: "foreignTravel.frequency", label: "Số lần" },
      { key: "foreignTravel.dateFrom", label: "Thời gian đi" },
      { key: "foreignTravel.dateTo", label: "Thời gian về" },
      { key: "foreignTravel.purpose", label: "Hình thức đi" },
      { key: "foreignTravel.verificationResult", label: "Kết quả kiểm tra xác minh" },
    ],
    15: [
      ...commonColumns,
      { key: "drugUse.type", label: "Hình thức sử dụng" },
      { key: "drugUse.verificationResult", label: "Kết quả kiểm tra xác minh" },
    ],
    16: [
      ...commonColumns,
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
      { key: "familyStatus.policyDetails", label: "Nội dung" },
    ],
    17: [
      ...commonColumns,
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
      { key: "seriousIllness.condition", label: "Nội dung" },
    ],
    18: [
      ...commonColumns,
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
      { key: "hardship.description", label: "Nội dung" },
    ],
    19: [
      ...commonColumns,
      { key: "fatherName", label: "Họ tên bố" },
      { key: "motherName", label: "Họ tên mẹ" },
      { key: "parentsAreVeterans.details", label: "Nội dung" },
    ],
    20: [
      ...commonColumns,
      { key: "ethnicity", label: "Dân tộc" },
      { key: "religion", label: "Tôn giáo" },
      { key: "specialRecruitment.details", label: "Nội dung" },
    ],
  }

  return appendixSpecificColumns[type] || commonColumns
}

// Helper function to get cell value
const getCellValue = (soldier: Soldier, key: string) => {
  if (key.includes('.')) {
    const [parent, child] = key.split('.') as [keyof Soldier, string]
    const parentValue = soldier[parent]
    return parentValue && typeof parentValue === 'object' ? (parentValue as any)[child] || '' : ''
  }

  return soldier[key as keyof Soldier] || ''
}

// Helper function to filter soldiers based on appendix type
const getFilteredSoldiers = (type: number, soldiers: Soldier[]): Soldier[] => {
  switch (type) {
    case 1: // Đảng viên
      return soldiers.filter(s => s.isPartyMember)
    
    case 2: // Bố mẹ là Đảng viên
      return soldiers.filter(s => 
        s.parentsPartyMember?.father || s.parentsPartyMember?.mother
      )
    
    case 3: // Dân tộc ít người
      return soldiers.filter(s => 
        s.ethnicity && s.ethnicity !== 'Kinh'
      )
    
    case 4: // Tôn giáo
      return soldiers.filter(s => s.religion)
    
    case 5: // Trình độ đại học cao đẳng trung cấp
      return soldiers.filter(s => s.education?.level)
    
    case 6: // Có vợ con
      return soldiers.filter(s => s.marriageStatus?.isMarried && s.marriageStatus?.spouseName)
    
    case 7: // Ly hôn
      return soldiers.filter(s => s.marriageStatus?.isDivorced)
    
    case 8: // Bố hoặc mẹ chết
      return soldiers.filter(s => 
        s.familyStatus?.isParentDeceased?.father || 
        s.familyStatus?.isParentDeceased?.mother
      )
    
    case 9: // Bản thân vi phạm pháp luật
      return soldiers.filter(s => s.legalIssues?.personalViolations && s.legalIssues.personalViolations.length > 0)
    
    case 10: // Có người thân vi phạm pháp luật
      return soldiers.filter(s => s.legalIssues?.familyViolations && s.legalIssues.familyViolations.length > 0)
    
    case 11: // Có hình xăm trên người
      return soldiers.filter(s => s.tattoos && s.tattoos.length > 0)
    
    case 12: // Vay nợ app
      return soldiers.filter(s => s.appLoans && s.appLoans.length > 0)
    
    case 13: // Thân nhân ở nước ngoài
      return soldiers.filter(s => s.foreignRelatives && s.foreignRelatives.length > 0)
    
    case 14: // Đã từng đi nước ngoài
      return soldiers.filter(s => s.foreignTravel && s.foreignTravel.length > 0)
    
    case 15: // Sử dụng ma túy
      return soldiers.filter(s => s.drugUse)
    
    case 16: // Gia đình chính sách
      return soldiers.filter(s => s.familyStatus?.policyFamily)
    
    case 17: // Bệnh hiểm nghèo
      return soldiers.filter(s => s.seriousIllness)
    
    case 18: // Hoàn cảnh khó khăn
      return soldiers.filter(s => s.hardship)
    
    case 19: // Bố mẹ là bộ đội, cán bộ
      return soldiers.filter(s => 
        s.parentsAreVeterans?.father || 
        s.parentsAreVeterans?.mother
      )
    
    case 20: // Tuyển lẻ
      return soldiers.filter(s => s.specialRecruitment)
    
    default:
      return soldiers
  }
}

export function AppendixView({ type, soldiers }: AppendixViewProps) {
  const columns = getColumns(type)
  const filteredSoldiers = getFilteredSoldiers(type, soldiers)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Phụ lục {type} - {getAppendixTitle(type)}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14">STT</TableHead>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead>Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSoldiers.map((soldier, index) => (
            <TableRow key={soldier.id}>
              <TableCell>{index + 1}</TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {getCellValue(soldier, column.key)}
                </TableCell>
              ))}
              <TableCell>{soldier.notes}</TableCell>
            </TableRow>
          ))}
          {filteredSoldiers.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 