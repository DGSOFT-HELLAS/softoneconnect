import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export function InputWithLabel({label, placeholder, control}) {
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}