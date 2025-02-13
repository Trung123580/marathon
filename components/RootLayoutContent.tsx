'use client'

import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoSlider from '@/components/PhotoSlider'
import { usePathname } from 'next/navigation'
import path from 'path'
import SupportBtn from './SupportBtn'

export function RootLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showPhotoSlider = ['login', 'register', 'forgot-password', 'change-password', 'event'].filter((item) => item !== '')
  const spitPath = pathname.split('/').filter((item) => item !== '')
  const isHidden = !showPhotoSlider.some((path) => path.includes(spitPath[0]))
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
        <AuthProvider>
          <Header />
          {isHidden && <PhotoSlider />}
          <main className={`flex-grow mx-auto w-full ${spitPath[0] === 'event' ? '' : 'px-4 sm:px-6 lg:px-8'}`}>
            {children}
          </main>
          <Footer />
          <SupportBtn />
        </AuthProvider>
    </ThemeProvider>
  )
}

