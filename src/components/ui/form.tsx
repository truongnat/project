import * as React from "react"
import { useFormContext, Controller, Control } from "react-hook-form"

interface FormFieldContextValue {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

interface FormFieldProps {
  name: string;
  control: Control<any>;
  render: (props: { field: any }) => React.ReactNode;
}

const FormField = ({ name, control, render }: FormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldContext.Provider value={{ name }}>
          {render({ field })}
        </FormFieldContext.Provider>
      )}
    />
  )
}

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ ...props }, ref) => (
  <form ref={ref} {...props} />
))
Form.displayName = "Form"

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="space-y-2" {...props} />
))
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className="text-sm font-medium" {...props} />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { formState: { errors } } = useFormContext()
  const { name } = React.useContext(FormFieldContext)
  const error = name ? errors[name] : null

  if (!error) return null

  return (
    <p ref={ref} className="text-sm text-red-500" {...props}>
      {error.message as string}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} 