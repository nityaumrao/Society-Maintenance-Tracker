'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, UserCircle2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserButton = () => {
    const session = useSession()
    const name = session?.data?.user?.name || 'User'
    const email = session?.data?.user?.email || 'No email available'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="size-9 border border-border/80 bg-card">
                    <AvatarImage
                        src={session?.data?.user?.image || ''}
                        alt={`@${name}`}
                    />
                    <AvatarFallback className="bg-accent text-xs font-semibold text-foreground">
                        {name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl border-border/80 bg-popover/95 p-2 backdrop-blur-xl"
            >
                <DropdownMenuLabel className="pb-2">
                    <div className="flex items-center gap-2">
                        <UserCircle2 className="size-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                            <p className="text-sm font-semibold leading-none">
                                {name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onSelect={handleLogout}
                        variant="destructive"
                        className="cursor-pointer rounded-md"
                    >
                        <LogOut className="size-4" />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const handleLogout = () => {
    signOut()
}

const LogOutButton = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
)

export default LogOutButton
