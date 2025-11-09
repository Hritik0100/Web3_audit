// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import IOSCursor from '../components/IOSCursor'
import AppLoader from '../components/AppLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChainSight - Illuminate the Blockchain',
  description: 'Turning Crypto Data Into Intelligence',
  icons: {
    icon: '/images/logo.jpeg',
    shortcut: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <AppLoader />
        <IOSCursor />
        {children}
      </body>
    </html>
  )
}