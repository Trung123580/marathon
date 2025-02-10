'use client'

import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { ChevronLeft, ChevronRight, Search, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Combobox } from '@headlessui/react'
import useTranslations from '@/hooks/useTranslations'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const photos = [
  { src: '/images/marathon1.jpg', alt: 'Runners at the starting line of a marathon' },
  { src: '/images/marathon2.jpg', alt: 'Marathon runners crossing a bridge' },
  { src: '/images/marathon3.jpg', alt: 'Cheering crowd at a marathon event' },
  { src: '/images/marathon4.jpg', alt: 'Runner crossing the finish line' },
]

const PhotoSlider: React.FC = () => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null)
  const { t }: {t:any} = useTranslations()
  const [selected, setSelected] = useState<(typeof eventList)[0] | null>(null)
  const [query, setQuery] = useState('')
  const {eventList} = useAuth()
  const router = useRouter()
  const refFileUpload = useRef<File | null>(null)
  const pathName = usePathname()
  const isShow = !pathName.includes('/event')
  const filteredEvents =
    query === ''
      ? eventList
      : eventList.filter((event) =>
          event.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const handleSearch = () => {
    if (selected) {
      router.push(`/event/${selected.code}`)
    }
  }

  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div className="relative w-full max-w-[1400px]">
        <div className="h-[500px] relative group">
          <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
            {photos.map((photo, index) => (
              <div key={index} className="relative h-[500px]">
                <div className="absolute inset-0 flex justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1400}
                    height={500}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    priority={index === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-full px-4 sm:px-6 lg:px-8">
                    <h2 className="text-white text-4xl font-bold text-center px-4">
                      {photo.alt}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
            <button
              className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-opacity opacity-0 group-hover:opacity-100 z-10"
              onClick={() => sliderRef?.slickPrev()}
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-opacity opacity-0 group-hover:opacity-100 z-10"
              onClick={() => sliderRef?.slickNext()}
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
          {!isShow ? <></> : <div className="absolute bottom-0 left-0 right-0 bg-[#fd652c] bg-opacity-60 p-4 z-20">
            <div className="max-w-[600px] mx-auto flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-[450px] z-30">
                <Combobox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(event: (typeof eventList)[0] | null) => event?.name ?? ''}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t?.search?.selectEvents || "Select or search events"}
                        autoFocus
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronLeft
                          className="h-5 w-5 text-gray-400 rotate-90"
                          aria-hidden="true"
                        />
                      </Combobox.Button>
                    </div>
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
                      {filteredEvents.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredEvents.map((event) => (
                          <Combobox.Option
                            key={event.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={event}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {event.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-teal-600'
                                    }`}
                                  >
                                    <Check className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
              <Button 
                type="submit" 
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                 <span className='text-nowrap mt-1'>{selected ? (t.search?.view || "View") : (t.search?.search || "Select Search")}</span>
              </Button>
            </div>
          </div> }
        </div>
      </div>
      {/* <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleModalSearch}
        onUpload={handleUpload}
      /> */}
    </div>
  )
}

export default PhotoSlider

