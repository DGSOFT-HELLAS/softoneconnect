import React, { useEffect, useState } from 'react'
import './style.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { FaAngleDown } from "react-icons/fa";
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
const ProfileAvatar = () => {
  const router = useRouter();

  const handleAvatarName = (firstName, lastName) => {
    if(firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase()
    }
  }

  const {data: session} = useSession();
  let initials = handleAvatarName(session?.name, session?.surname);
  console.log(session)
  useEffect(() => {
    if(session === undefined || session === null) {
      router.push('/login')
    }
  }, [])
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
          <div className='avatar_wrapper'>
            <Button className='avatar'>
                {initials}
            </Button>
            <div className="avatar_details">
              <div>
                <p className='text-sm font-medium leading-none'>{session?.name} {session?.surname}</p>
                <p className='text-xs leading-none text-muted-foreground'>{session?.role}</p>
              </div>
              <FaAngleDown className='text-muted-foreground ml-2'/>
            </div>
          </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{session?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
          {session?.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
      <DropdownMenuItem onClick={() => {
    signOut({ redirect: false }).then(() => {
        router.push("/login"); // Redirect to the dashboard page after signing out
    });
}}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  )
}

export default ProfileAvatar;