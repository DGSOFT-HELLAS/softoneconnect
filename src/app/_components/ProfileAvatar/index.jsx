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
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="avatar_wrapper">
      <Skeleton className="avatar " />
      <div className="flex flex-column">
        <Skeleton className="avatar_skeleton_text_top" />
        <Skeleton className="avatar_skeleton_text_bottom" />
      </div>
    </div>
  )
}




const ProfileAvatar = () => {
  const router = useRouter();

  const handleAvatarName = (firstName, lastName) => {
    if (firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase()
    }
  }

  const { data: session } = useSession();
  // let initials = session ? session?.name.split(' ')[0][0] + session?.name.split(' ')[1][0] : '';
  return (
    <>
      {/* {initials ? ( */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <div className='avatar_wrapper'>
                <Button className='avatar'>
                  {/* {initials} */}
                  US
                </Button>
                {/* <div className="avatar_details">
                  <div>
                    <p className='text-sm font-medium leading-none'>{session?.name}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{session?.role}</p>
                  </div>
                  <FaAngleDown className='text-muted-foreground ml-2' />
                </div> */}
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator /> */}
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
      {/* ) : (
        <SkeletonDemo />
      )} */}
    </>


  )
}

export default ProfileAvatar;