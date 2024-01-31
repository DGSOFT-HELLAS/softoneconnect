

'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, MoreHorizonta, ChevronDown, Pin, PinOff } from 'lucide-react';
import { motion, useAnimate, usePresence } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";




export const options = [
    {
        id: 1,
        label: 'Dashboard1',
        href: '/product01',
    },
    {
        id: 1,
        label: 'Dashboard2',
        href: '/product02',
    },
    {
        id: 1,
        label: 'Dashboard3',
        href: '/product03',
    },
    {
        id: 1,
        label: 'Dashboard4',
        href: '/product04',
    },
    {
        id: 1,
        label: 'Dashboard5',
        href: '/product05',
    },
    {
        id: 1,
        label: 'Dashboard6',
        href: '/product06',
    },
    {
        id: 1,
        label: 'Dashboard7',
        href: '/product07',
    },
    {
        id: 1,
        label: 'Dashboard8',
        href: '/product08',
    },
    {
        id: 1,
        label: 'Dashboard9',
        href: '/product09',
    },
    {
        id: 2,
        label: 'Product',
        href: '/dashboard10',

        options: [
            { label: 'Subproduct', href: '/product' },
            { label: 'Subproduct2', href: '/product' }
        ]
    },
    {
        id: 3,
        label: 'Users',
        href: '/dashboard',
    },

]
export default function PinnedNavbar() {
    const [state, setState] = useState({
        urls: [],
        pinnedUrls: [{
            label: null,
            href: null,
        }]
    })

    const extractUrl = () => {
        const urls = [];
        options.forEach((item) => {
            if (item.options) {
                item.options.forEach((subItem) => {
                    urls.push({
                        label: subItem.label,
                        href: subItem.href,
                    });
                });
            } else {
                urls.push({
                    label: item.label,
                    href: item.href,

                });
            }
        });
        setState(prev => ({ ...prev, urls: urls }))
    }

    useEffect(() => {
        extractUrl()
    }, [])

    const removePinnedItem = (item) => {
        const updatePinned = state.pinnedUrls.filter((url) => url.href !== item.href);
        setState(prev => ({ ...prev, pinnedUrls: updatePinned }));
    }
    return (
        <div className="bg-secondary p-2 rounded-md mb-4 inline-flex ">
           < PinnedBox state={state} setState={setState}>
                {state.pinnedUrls.map(item => {
                    return (
                        <DropdownMenuItem key={item.href}>
                            <div className="flex align-center w-full cursor-pointer p-2">
                                <PinOff onClick={() => removePinnedItem(item)} className="text-slate-400 mr-2 h-4 w-4" />
                                <span >{item.label ? (item.label) : '...much empty'}</span>
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </ PinnedBox>
        </div>
    )
}



const PinnedBox = ({ children, state, setState }) => {

    const router = useRouter();
    return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div size="sm" variant="ghost" className="pinned-item bg-background text-foreground mr-2 inline-flex" >
                        <Pin className="mr-2 h-4 w-4" />
                        Pinned Links
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Pinned Items</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {children}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                            <DropdownMenuItem>
                                    <div className="flex" onClick={() => router.push('/settings#settings')}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        <span className="text-slate-400">add more </span>
                                    </div>
                            </DropdownMenuItem>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}


const DialogLinks = ({ state, setState }) => {
   
    const [scope, animate] = useAnimate()
    const [isPresent, safeToRemove] = usePresence()
    const enterAnimation = async () => {
        await animate(scope.current, {
            opacity: [0, 1],
        }, {
            ease: "easeInOut",
            duration: 5,
        })
    } 
    useEffect(() => {
        enterAnimation()
    }, [])
    
  
    const handleClick = async (item) => {
        const updateUlrs = state.urls.filter((url) => url.href !== item.href);
        const updatePinnedUrls = [...state.pinnedUrls, { label: item.label, href: item.href }];
        setState(prev => ({ ...prev, urls: updateUlrs, pinnedUrls: updatePinnedUrls }))
    }

    const Link = ({item}) => {
        return (
            <li
                ref={scope}
                onClick={() => handleClick(item)}
                key={item.href}
                className="rounded-md border-dashed flex align-center justify-between mb-2 w-full cursor-pointer border p-2 ">
                    <span >{item.label}</span>
                    <PlusCircle className="text-foreground mr-2 h-4 w-4 " />
        </li>
        )
    } 

    return (
        <div>
            {state.urls.map((item, index) => {
                return (
                   <Link item={item} key={index}/>
                )
            })}
        </div>
    )
}