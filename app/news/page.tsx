'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'

export default function News() {
  const { t }: { t: any } =  useTranslations()

  const newsItems = [
    { id: 1, title: "Upcoming Marathon in Central Park", date: "2023-05-15" },
    { id: 2, title: "New Photo Technology Unveiled", date: "2023-05-10" },
    { id: 3, title: "Marathon Training Tips from the Pros", date: "2023-05-05" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{t?.news?.title}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{item.date}</p>
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/news/${item.id}`}>{t?.news?.readMore}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

