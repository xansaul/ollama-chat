import { BotMessageSquare } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export const Navbar = () => {
    return (
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <Button variant="ghost" size="icon" aria-label="Home">

                    <BotMessageSquare />
                </Button>
            </div>
            <nav className=''>
                
            </nav>
        </aside>
    )
}
