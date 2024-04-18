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


export function CustomDropSearch({ name, options, optionLabel, optionValue, form }) {


    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-col">
                        <FormLabel className="mb-2">Language</FormLabel>
                        <Popover className='w-full'>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            <>
                                                {options.find((option) => option[optionValue] === field.value)[optionLabel]}
                                            </>
                                        ) : "Select language"}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-[400px] p-0">
                                <ScrollArea className="h-[300px]">
                                    {options.map((option, index) => {
                                        return (
                                            <span
                                                className={styles.item}
                                                key={index}
                                                onClick={() => form.setValue(name, option[optionValue])}
                                            >
                                                {option[optionLabel]}
                                            </span>
                                        )
                                    })}
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
