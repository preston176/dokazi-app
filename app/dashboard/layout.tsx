"use client"
import React, { useState } from 'react'
import Header from './_components/Header'



function layout({ children }: { children: React.ReactNode }) {
    const [, setIsMobileSidebarOpen] = useState(false)
    return (
        <div>
            <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

            {children}
        </div>
    )
}

export default layout