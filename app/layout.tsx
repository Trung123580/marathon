import type { Metadata } from 'next'
import { Noto_Sans_Balinese as Noto_Sans_Vietnamese } from 'next/font/google'
import { RootLayoutContent } from '@/components/RootLayoutContent'
import '@/app/globals.css'

const notoSansVietnamese = Noto_Sans_Vietnamese({
  subsets: ['balinese', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Marathon Event Photo',
  description: 'Capture your marathon moments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSansVietnamese.variable} font-sans antialiased bg-background min-h-screen flex flex-col`}
      >
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  )
}



import './globals.css'