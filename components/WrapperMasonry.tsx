'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useEffect } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import useTranslations from '@/hooks/useTranslations'
// import { IoIosClose, IoIosCloseCircle } from 'react-icons/io'
type photoItem = {
  finalKey:string
  id:string
  publicThumbUrl:string
  publicUrl:string
}
const WrapperMasonry = ({ data, onClickRightMouse }: {data: photoItem[], onClickRightMouse: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
  const { t }: { t: any } =  useTranslations()
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', {
      Carousel: {
        infinite: false,
      },
    })

    return () => {
      NativeFancybox.destroy()
    }
  }, [])
  return (
    <ResponsiveMasonry className='mt-4' columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1024: 4 }}>
      <Masonry>
        {data.map((photo: any) => (
          <div key={photo.id} className='relative p-1 group' onContextMenu={onClickRightMouse}>
            <a data-fancybox='gallery' className='flex justify-center' href={photo.publicUrl}>
              <img src={photo.publicThumbUrl} className='object-contain rounded-lg' alt={photo.caption} />
            </a>
            <button className='hidden text-white showAnimation group-hover:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%_-_8px)] bg-red-500 py-1 text-sm'>{t?.search?.buy}</button>
            {/* {!!photo?.isUser ? (
              <div className='absolute top-0 right-0  p-1 ' onClick={() => onRemoveImage(photo.finalKey)}>
                <IoIosClose size={25} className='bg-black/85 hover:bg-black duration-300 rounded-full text-white' />
              </div>
            ) : null} */}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default WrapperMasonry
