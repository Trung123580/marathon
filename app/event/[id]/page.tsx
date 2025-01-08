'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'
import SearchModal from '@/components/SearchModal'

const events = [
  {
    id: 1,
    title: 'City Marathon 2023',
    image: '/images/city-marathon.jpg',
    date: '2023-09-15',
    description: 'Experience the thrill of running through the heart of the city.',
  },
  {
    id: 2,
    title: 'Mountain Trail Run',
    image: '/images/mountain-trail.jpg',
    date: '2023-10-22',
    description: 'Challenge yourself with a scenic run through mountain trails.',
  },
  {
    id: 3,
    title: 'Coastal Half Marathon',
    image: '/images/coastal-half-marathon.jpg',
    date: '2023-11-05',
    description: 'Enjoy breathtaking ocean views as you run along the coast.',
  },
]

export default function EventDetails({ params }: { params: { id: string } }) {
  const { t, locale }: {t:any, locale:any} = useTranslations()
  const eventId = parseInt(params.id)
  const event = events.find(e => e.id === eventId)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const handleSearch = (searchTerm: string, file: File | null, selectedFace: number | null) => {
    console.log('Searching:', { searchTerm, file, selectedFace })
    // Implement the search logic here
  }

  if (!event) {
    return <div className="container mx-auto px-4 py-8">{t?.event?.notFound || 'Event not found'}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-6">{event?.title}</h1>
      <div className="space-y-4">
        <p><strong>{t?.event?.date || 'Date'}:</strong> {new Date(event.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>{t?.event?.description || 'Description'}:</strong> {event.description}</p>
        <div className="flex space-x-4">
          <Button>{t?.event?.registerNow || 'Register Now'}</Button>
          <Button onClick={() => setIsSearchModalOpen(true)}>
            <Search className="w-4 h-4 mr-2" />
            {t?.search?.searchPhotos || 'Search Photos'}
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t?.event?.photos || 'Event Photos'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="relative h-[150px]">
              <Image 
                src={`/images/event-photo-${index + 1}.jpg`} 
                alt={`Event photo ${index + 1}`} 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  )
}

