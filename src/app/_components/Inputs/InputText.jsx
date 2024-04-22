import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
export function InputText({label, placeholder, control, name, disabled}) {
  return (
    <FormField

          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled} 
                  placeholder={placeholder} {...field} 
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}