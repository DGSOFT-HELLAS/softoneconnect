"use client"
import styles from './styles.module.css'
import { CaretSortIcon, } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
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
import { useInfiniteQuery, } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { Loader2 } from "lucide-react"

export function CustomDropSearch({
    label, 
    placeholder, 
    name,
    optionLabel, 
    optionValue, 
    form, 
    fetcher,
}) {
    const { ref, inView } = useInView();
    const [state, setState] = useState({
            search: '',
            active: '',
            option:placeholder,
            open: false,
    
        })

    //tanstack infinite fetch hook options:
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        status,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => fetcher(pageParam, state.search),
        queryKey: ['clients', state.search],
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 100) {
                return pages.length * 100 + 1;
            } else {
                return undefined; // Indicates no more pages to fetch
            }
        },
    })

  
    const handleSearchChange = (event) => {
        const newSearch = event.target.value;
        setState(prev => ({ ...prev, search: newSearch}))
       
    };

    useEffect(() => {
        //when the loader is in view, in the end of the component fetch the next page:
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView])



 

   
    
    const handleClick = (client) => {
      
        form.setValue(name, client[optionValue])
        setState(prev => ({...prev, active: client[optionValue], option: client[optionLabel]}))
        handleOpenChange();
        
    }

    //Return the content after the data has loaded:
    const content = data?.pages.map((page, index) => {
        if (!page) return;
        return page.map((client, index) => {
            return (
                <div 
            
                key={index}>
                    <span
                        className={`${styles.item} ${state.active === client[optionValue] && styles.active}`}
                        onClick={() => {
                            handleClick(client)
                        }}
                    >
                        {client[optionLabel]}
                    </span>
                    {index !== page.length - 1 && <Separator />}
                </div>
            )
        })
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
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                       
                                        {state.option}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-[400px] p-0">
                                <div className={styles.searchInput}>
                                  
                                        <input 
                                         placeholder='αναζήτηση'
                                         value={state.search}
                                        onChange={handleSearchChange}
                                        />
                                    <Search />
                                </div>
                                <ScrollArea className={styles.infiniteDropdown}>
                                    { content}
                                    {hasNextPage && (
                                          <div className="flex justify-center items-center h-[100px]">
                                            <Loader2 ref={ref} className="w-6 h-6 animate-spin" />
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
