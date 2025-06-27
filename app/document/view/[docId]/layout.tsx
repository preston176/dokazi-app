"use client"
import Header from '@/app/dashboard/_components/Header'
import { SignedIn } from '@clerk/nextjs'
import React, { useState } from 'react'




function layout({ children }: { children: React.ReactNode }) {
    const [, setIsMobileSidebarOpen] = useState(false)
    return (
        <div >
            {
                <SignedIn>
                    <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
                </SignedIn>
            }

            {children}
        </div>
    )
}

export default layout