'use client'

import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoSlider from '@/components/PhotoSlider'
import { usePathname } from 'next/navigation'
import NextAuthProvider from '@/contexts/NextAuthProvider'

export function RootLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showPhotoSlider = !['/login', '/register'].includes(pathname)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextAuthProvider>
        <AuthProvider>
          <Header />
          {showPhotoSlider && <PhotoSlider />}
          <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </NextAuthProvider>
    </ThemeProvider>
  )
}

