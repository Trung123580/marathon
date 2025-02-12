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
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: ["/favicon/favicon.ico?v=4"],
    apple: ["/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Marathon Event Photo',
    description: 'Capture your marathon moments',
    images: [
      {
        url: "/background.jpg",
        type: "image/jpg",
        width: 800,
        height: 450,
      },
    ],
  },
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