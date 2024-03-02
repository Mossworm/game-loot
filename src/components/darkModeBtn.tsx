"use client";

import React from 'react'
import { useState } from 'react'

export default function DarkModeBtn() {

    const [isDark, setDark] = useState(false);
    const darkButtonFunc = () => {
        setDark(!isDark);
        if (isDark) {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        }
    }

    return (
        <button className="block size-16" onClick={darkButtonFunc}><img src={isDark ? '/images/moon.svg' : '/images/sun.svg'} /></button>
    )
}
