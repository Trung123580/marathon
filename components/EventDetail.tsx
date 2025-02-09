'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'
import SearchModal from '@/components/SearchModal'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { usePathname, useRouter } from 'next/navigation'
import { useIsMobile } from './ui/use-mobile'
import Loading from './Loading'

// const events = [
//   {
//     id: 1,
//     title: 'City Marathon 2023',
//     image: '/images/city-marathon.jpg',
//     date: '2023-09-15',
//     description: 'Experience the thrill of running through the heart of the city.',
//   },
//   {
//     id: 2,
//     title: 'Mountain Trail Run',
//     image: '/images/mountain-trail.jpg',
//     date: '2023-10-22',
//     description: 'Challenge yourself with a scenic run through mountain trails.',
//   },
//   {
//     id: 3,
//     title: 'Coastal Half Marathon',
//     image: '/images/coastal-half-marathon.jpg',
//     date: '2023-11-05',
//     description: 'Enjoy breathtaking ocean views as you run along the coast.',
//   },
// ]
type photoItem = {
  finalKey:string
  id:string
  publicThumbUrl:string
  publicUrl:string
}
type PhotoList = {
  imageKey:string
  photoItems: photoItem[]
  totalItems:number
  totalPages:number
}
export default function EventDetail({dataDetail, dataPhotoList, page}:{page: number,dataPhotoList:PhotoList, dataDetail:any}) {
  const { t }: {t:any} = useTranslations()
  console.log(dataDetail)
  console.log(dataPhotoList)
  const router = useRouter()
  const pathName = usePathname()
  const isMobile = useIsMobile()
  
  const dataPhotos = dataPhotoList.photoItems ?? []
  const totalPages = dataPhotoList.totalPages ?? 1
  console.log(dataPhotos, totalPages, page)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchPage, setSearchPage] = useState("")
  const handleSearch = (searchTerm: string, file: File | null, selectedFace: number | null) => {
    console.log('Searching:', { searchTerm, file, selectedFace })
    // Implement the search logic here
  }
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`${pathName}?page=${page}`)
      setIsLoading(true)
    }
  }
  useEffect(() => {
    if (page) setIsLoading(false)
  }, [page])

  const maxVisiblePages = isMobile ? 4 :7;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  if (isLoading) return <Loading />
  
  if (!dataDetail) return <div className="container mx-auto px-4 py-8">{t?.event?.notFound || 'Event not found'}</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-6">{dataDetail?.name}</h1>
      <div className="space-y-4">
        <p><strong>{t?.event?.date || 'Date'}:</strong> {dataDetail?.eventTime ?? ''}</p>
        <div>
          <strong>{t?.event?.description || 'Description'}:</strong>
          <p dangerouslySetInnerHTML={{__html: dataDetail?.description as string }}></p>
        </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {dataPhotos.map(({id,publicThumbUrl, finalKey}) => (
            <div key={id} className="relative">
              <img className='object-contain w-full h-full'
              src={publicThumbUrl} 
              alt={finalKey} 
              loading='lazy'/>
            </div>
          ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          {/* Nút Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(page - 1)}
              href=''
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Hiển thị nút "1" nếu cần */}
          {startPage > 1 && (
            <>
              <PaginationItem >
                <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
              </PaginationItem>
              {startPage > 2 && <PaginationEllipsis />}
            </>
          )}

          {/* Hiển thị các trang trong phạm vi */}
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  className={`w-8 h-8 ${page === pageNumber ? ' bg-red-300' : ''}`}
                  isActive={page === pageNumber}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Hiển thị nút "totalPages" nếu cần */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Nút Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(page + 1)}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Nhập trang..."
          className="border p-2 w-24 text-center rounded-lg"
          value={searchPage}
          onChange={(e) => setSearchPage(e.target.value)}
        />
        <button
          onClick={() => goToPage(Number(searchPage))}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={!searchPage || Number(searchPage) < 1 || Number(searchPage) > totalPages}
        >
          Tìm kiếm
        </button>
      </div> */}

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  )
}

