'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'

// Expanded fake event data
const allEvents = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  image: `/images/event-${(i % 4) + 1}.jpg`, // Assuming you have 4 different event images
  date: new Date(2023, Math.floor(i / 4), (i % 30) + 1).toISOString().split('T')[0],
}))

export function EventList() {
  const { t, locale } = useTranslations()
  const [visibleEvents, setVisibleEvents] = useState(20) // Initially show 20 events (5x4 grid)

  const loadMore = () => {
    setVisibleEvents(prevVisible => Math.min(prevVisible + 10, allEvents.length))
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <h2 className="text-3xl font-bold mb-8 text-center">{t?.events?.upcomingEvents || 'Upcoming Events'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {allEvents.slice(0, visibleEvents).map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={event.image}
                  alt={event?.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{event?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{new Date(event.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/event/${event.id}`}>
                    {t?.events?.viewPhotos || 'View Photos'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        {visibleEvents < allEvents.length && (
          <div className="text-center">
            <Button onClick={loadMore}>
              {t?.events?.loadMore || 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

