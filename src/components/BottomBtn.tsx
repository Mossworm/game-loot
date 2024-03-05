"use client";

import React from 'react'

export default function BottomBtn({ label, onClick, disabled }: { label: string, onClick: VoidFunction }|any) {
    return (
        <button 
            className="mx-4 w-full max-w-80 h-20 bg-light-button dark:bg-dark-button hover:opacity-30 text-3xl sm:text-4xl rounded-xl place-content-center text-dark-text" 
            onClick={onClick} 
            disabled={disabled}
        >{label}</button>
    )
}