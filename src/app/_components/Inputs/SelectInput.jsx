"use client"
import styles from './styles.module.css'


import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export function SelectInput({ name, label, control, placeholder, options, optionValue, optionLabel }) {

    if (!optionValue) {
        throw new Error('SelectInput must have an optionValue prop')
    }
    if (!optionLabel) {
        throw new Error('SelectInput must have an optionLabel prop')
    }
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option, index) => {
                                return (
                                    <SelectItem
                                        key={index}
                                        value={option[optionValue]}>
                                        {option[optionLabel]}
                                    </SelectItem>
                                )

                            })}
                 
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
