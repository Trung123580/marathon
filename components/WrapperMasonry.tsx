"use client"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useEffect } from "react"
import { Fancybox as NativeFancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import useTranslations from "@/hooks/useTranslations"
import Image from "next/image"
// import { IoIosClose, IoIosCloseCircle } from 'react-icons/io'
type photoItem = {
  finalKey: string
  id: string
  publicThumbUrl: string
  publicUrl: string
}
const WrapperMasonry = ({ data, onClickRightMouse, onBuy }: { onBuy: ({ finalKey, publicUrl }: { publicUrl?: string; finalKey?: string }) => void; data: photoItem[]; onClickRightMouse: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
  const { t }: { t: any } = useTranslations()

  const downloadImage = async () => {
    const activeSlide = NativeFancybox.getInstance()?.getSlide() as any

    var url = activeSlide.src
    var time = Math.floor(Date.now() / 1000)

    const response = await fetch(url)
    const blob = await response.blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "timanh-download-" + time + ".jpg"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {
      Carousel: {
        infinite: false,
      },
      Toolbar: {
        items: {
          download: {
            tpl: `<button class="f-button"><svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"></path></svg></button>`,
            click: () => {
              downloadImage()
            },
          },
        },
        display: {
          left: ["infobar"],
          middle: [],
          right: ["download", "slideshow", "fullscreen", "thumbs", "close"],
        },
      },
    })
    return () => {
      NativeFancybox.destroy()
    }
  }, [])

  return (
    <ResponsiveMasonry className='' columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1024: 4 }}>
      <Masonry
        style={{ gap: "16px" }}
        itemStyle={{
          gap: "16px",
          cursor: "pointer",
          width: "100%",
        }}>
        {data.map((photo: any) => (
          <div key={photo.id} className='relative group' onContextMenu={onClickRightMouse}>
            <a data-fancybox='gallery' className='flex justify-center' href={photo.publicUrl}>
              <Image src={photo.publicThumbUrl} className='object-contain rounded-lg' priority quality={100} alt='' width={500} height={500} />
            </a>
            {!!photo?.isPaid ? (
              <span className='text-white w-full text-center showAnimation group-hover:block absolute bottom-0 left-1/2 -translate-x-1/2  bg-red-500 py-1 text-sm rounded-bl-lg rounded-br-lg'>{t?.event?.bought}</span>
            ) : (
              <button onClick={() => onBuy({finalKey: 'ITEM', publicUrl: photo.publicUrl})} className=' md:hidden text-white showAnimation group-hover:block w-full absolute bottom-0 left-1/2 -translate-x-1/2  bg-red-500 py-1 text-sm rounded-bl-lg rounded-br-lg'>
                {t?.search?.buy}
              </button>
            )}
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
