"use client"
import { Textarea as TextInput } from "@/components/ui/textarea"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"



export function TextArea({control, name, label, placeholder, rows}) {
 

  return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                < TextInput 
                rows={rows}
                  placeholder={placeholder}
                  className="resize-y"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
  )
}
