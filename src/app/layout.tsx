import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import DarkModeBtn from '@/components/darkModeBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'game-loot',
  description: '게임 설문 및 추천 사이트',
  icons: {
    icon: "/favicon.svg",
  }
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-light-bg dark:bg-dark-bg`}>

        <div className='absolute right-0 p-3 sm:p-5 z-10'>
          <DarkModeBtn />
        </div>
        {children}

      </body>
    </html>
  )
}