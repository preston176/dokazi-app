import React from 'react'
import Header from './_components/Header'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}

        </div>
    )
}

export default layout