'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/dropdown-menu'
import useCurrentUser from '@/lib/hooks/useCurrentUser'

export const UserButton = () => {
    const session = useSession()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage
                            src={session?.data?.user?.image || ''}
                            alt="@{session?.data?.user?.name}"
                        />
                        <AvatarFallback>
                            {session?.data?.user?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        {session?.data?.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LogOutButton>Log Out</LogOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const LogOutButton = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession()

    const handleLogout = () => {
        signOut()
    }

    return (
        <>
            <span
                onClick={handleLogout}
                className="cursor-pointer hover:underline"
            >
                {children}
            </span>
        </>
    )
}

export default LogOutButton
