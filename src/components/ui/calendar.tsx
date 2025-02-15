import * as React from "react"
import { DayPicker } from "react-day-picker"
import { vi } from 'date-fns/locale'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      locale={vi}
      {...props}
    />
  )
} 