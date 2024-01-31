"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
 
export function CheckboxWithText({label, htmlFor, id}) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        
      </div>
    </div>
  )
}