'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'
import { uuidv4 } from '@/utils/helpers'

type EventItem = {
  banner:string
  code:string
  displayStatus:string
  groupId:string
  groupName:string
  id:string
  logo:string
  name:string
  nameEN:string
}

export function EventList({dataEvents}: {dataEvents: EventItem[]}) {
  const { t } = useTranslations()
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <h2 className="text-3xl font-bold mb-8 text-center">{t?.events?.upcomingEvents || 'Upcoming Events'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
          {dataEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-40">
                <img className='object-contain w-full h-full' src={event.logo} loading='lazy' alt={event.name} />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{event.name}</h3>
                {/* <p className="text-sm text-gray-600 mb-4">{new Date(event.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                <Button asChild size="sm" className="w-full">
                  <Link href={`/event/${event.code}`}>
                    {t?.events?.viewPhotos || 'View Photos'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* {(
          <div className="text-center">
            <form action={formAction}>
              <Button type='submit'>
                {isPending ? "Loading" : t?.events?.loadMore || 'Load More'}
              </Button>
            </form>
          </div>
        )} */}
      </div>
    </section>
  )
}

