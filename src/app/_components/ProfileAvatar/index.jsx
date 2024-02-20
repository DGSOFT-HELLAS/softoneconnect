import React, { useState } from 'react'
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
const ProfileAvatar = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const firstName = 'giannis';
  const lastName = 'katsaros';
  const role = "admin"
  const handleAvatarName = () => {
    if(firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase()
    }
  }
  let initials = handleAvatarName();
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
          <div className='avatar_wrapper'>
            <Button className='avatar'>
                {initials}
            </Button>
            <div className="avatar_details">
              <div>
                <p className='text-sm font-medium leading-none'>{firstName} {lastName}</p>
                <p className='text-xs leading-none text-muted-foreground'>{role}</p>
              </div>
              <FaAngleDown className='text-muted-foreground ml-2'/>
            </div>
          </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">shadcn</p>
          <p className="text-xs leading-none text-muted-foreground">
            m@example.com
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