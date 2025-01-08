'use client'

import { useEffect } from 'react'
import Fancybox from '@fancyapps/ui/dist/fancybox/fancybox.esm.js'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

interface GalleryProps {
  images: { src: string; alt: string }[]
}

export default function Gallery({ images }: GalleryProps) {
  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      // Your custom options
    })

    return () => {
      Fancybox.destroy()
    }
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <a
          key={index}
          data-fancybox="gallery"
          href={image.src}
          className="block overflow-hidden rounded-lg"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </a>
      ))}
    </div>
  )
}

