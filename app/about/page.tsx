'use client'
import useTranslations from '@/hooks/useTranslations'

export default function About() {
  const { t }: { t: any } =  useTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{t?.about?.title || 'About Us'}</h1>
        <div className="space-y-4">
          <p>{t?.about?.content1 || 'Welcome to our Marathon Event Photo platform.'}</p>
          <p>{t?.about?.content2 || 'We are dedicated to capturing and sharing the most memorable moments of your running journey.'}</p>
          <p>{t?.about?.content3 || 'Our team of professional photographers ensures that every stride, every smile, and every finish line crossing is immortalized.'}</p>
        </div>
      </div>
    </div>
  )
}

