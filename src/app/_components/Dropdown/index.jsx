"use client"
import styles from './styles.module.css'
import { CaretSortIcon, } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  useState } from 'react'
import { Separator } from "@/components/ui/separator"

export function CustomDropdown({
    label, 
    placeholder, 
    name, 
    optionLabel, 
    optionValue, 
    form, 
    disabled,
    data,
}) {
    console.log(data)
    const [state, setState] = useState({
            search: '',
            active: '',
            open: false,
    
        })

    const content =data?.map((item, index) => {
            return (
                <div 
            
                key={index}>
                    <span
                        className={`${styles.item} ${state.active === item[optionValue] && styles.active}`}
                        onClick={() => {
                            form.setValue(name, item[optionValue])
                            setState(prev => ({...prev, active: item[optionValue], option:item[optionLabel]}))
                            handleOpenChange();
                        }}
                    >
                        {item[optionLabel]}
                    </span>
                    {index !== data.length - 1 && <Separator />}
                </div>
            )
        })

    
    const handleOpenChange = () => {
        setState((prev) => ({ ...prev, open: !prev.open }))
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-col">
                        <FormLabel className="mb-2">{label}</FormLabel>
                        <Popover className='w-full' 
                            open={state.open}
                            onOpenChange={handleOpenChange}
                        >
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                         disabled={disabled || !data?.length}
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            <>
                                                {data.find((option) => option[optionValue] === field.value)[optionLabel]}
                                            </>
                                        ) : (
                                             placeholder || "Επιλογή..."
                                        )}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-[300px] p-0">
                                
                                <ScrollArea className={styles.dropdown}>
                                    {data?.length > 0 ? (
                                        content
                                    ) : (
                                        <div className='p-2'>
                                            <span className="text-sm text-muted-foreground">Δεν βρέθηκαν αποτελέσματα</span>
                                        </div>
                                    )}
                                </ScrollArea>

                            </PopoverContent>
                        </Popover>

                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
