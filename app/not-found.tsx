'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'

export default function NotFound() {
  const { t } :{t: any}= useTranslations()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t?.notFound?.title}</h1>
      <p className="text-lg sm:text-xl mb-8">{t?.notFound?.message}</p>
      <Button asChild size="lg">
        <Link href="/">{t?.notFound?.goBack}</Link>
      </Button>
    </div>
  )
}

