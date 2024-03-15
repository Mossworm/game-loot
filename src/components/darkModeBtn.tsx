"use client";

import React, { useLayoutEffect } from 'react'
import { useState, useEffect } from 'react'

export default function DarkModeBtn() {
    const [isDark, setDark] = useState(false);

    const setTheme = (theme : string) => {
        if(theme === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            setDark(true);
        } else if(theme === "light") {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            setDark(false);
        }
    }

    const toggleTheme = () => {
        isDark ? setTheme("light") : setTheme("dark");
    }

    useLayoutEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        console.log(localTheme);
        if (window.matchMedia("(prefers-color-scheme:dark)").matches && !localTheme) {
            setTheme("dark");
        } else {
            localTheme === "dark" ? setTheme("dark") : setTheme("light");
        }
    },[]);

    return (
        <button className="block size-8 sm:size-16" onClick={toggleTheme}><img src={isDark ? '/images/moon.svg' : '/images/sun.svg'} /></button>
    )
}
