import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Navbar from '@/components/dashboard/Navbar'

const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <div className="app-shell flex w-full flex-col items-stretch justify-start">
                <Navbar />
                <div className="app-content">
                    <div className="app-page">{children}</div>
                </div>
            </div>
        </SessionProvider>
    )
}

export default AuthProvider
