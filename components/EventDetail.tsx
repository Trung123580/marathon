'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'
import SearchModal from '@/components/SearchModal'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { usePathname, useRouter } from 'next/navigation'
import { useIsMobile } from './ui/use-mobile'
import Loading from './Loading'
import { getBase64StringFromDataURL, handleGetCookie, jwtDecodeToken, uuidv4 } from '@/utils/helpers'
import { getPhotos, getUserFaces, getUserTransactions, postInitTransactions, uploadFile } from '@/services'
import ModalQR from './ModalQR'
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
export default function EventDetail({dataDetail, dataPhotoList, page, code}:{code:string,page: number,dataPhotoList:PhotoList, dataDetail:any}) {
  const { t }: {t:any} = useTranslations()
  const router = useRouter()
  const pathName = usePathname()
  const isMobile = useIsMobile()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [statePhoto, setStatePhoto] = useState({
    dataPhotos: dataPhotoList?.photoItems ?? [],
    totalPages: dataPhotoList?.totalPages ?? 1,
  })
  const {dataPhotos,totalPages} = statePhoto
  const [isLoading, setIsLoading] = useState(false)
  const [facesData, setFacesData] = useState([])
  const token = handleGetCookie({key: 'token-app'}) as string

   const handleModalSearch = useCallback(async (searchTerm: string, selectedFace: number | null) => {
    if (!dataDetail) return
    const {data, message, status} = await getPhotos({eventCode:dataDetail.code, face: selectedFace?.toString(), query: searchTerm, page: 1, token: token})
    const dataResponse = data as PhotoList
    alert(status)
    if (!status) {
      alert('search failed')
      return
    }
    setStatePhoto({
      dataPhotos: dataResponse.photoItems,
      totalPages: dataResponse.totalPages
    })
    if (page) router.push(`${pathName}`)
  }, [dataDetail, token, page])
  console.log(dataDetail)
  
  const handleGetUserFaces = useCallback(async () => {
    if (!token) return
    const {data} = await getUserFaces({token: token})
    setFacesData(data?.data ?? [])
  }, [token])
  useEffect(() => {
    if (token) {
      handleGetUserFaces()
    }
  }, [token])
  const handleUpload = async (file: File | null) => {
    if (file) {
      if (!token) {
        window.location.href = '/login'
      }
      const nameFile = file?.name.split('.')[1] as string
      const base64String = await getBase64StringFromDataURL(file as File)
      const user = jwtDecodeToken({token: token as string}) as any
      setIsLoading(true)
      const { status} = await uploadFile({base64: base64String, userId: user?.unique_name , name: `${uuidv4()}.${nameFile}`, token: token as string})
      if (!status) alert('Error upload file size')
      await handleGetUserFaces()
      setIsLoading(false)
    }
  }
  const handleOpenModalSearch = () => {
    if (!token) {
      router.push('/login')
      return
    }
    setIsSearchModalOpen(true)
  }

  const handleTransactions = async () => {
    setIsQRModalOpen(true)
    // const response = await getUserTransactions({token: token, eventCode: code})
    // console.log(response)
  }

  const handleBuy = async () => {
    // const response = await postInitTransactions({token, eventCode: code, face:'1', query:''})
    // console.log(response)
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
  if (!dataDetail) return <div className="container mx-auto px-4 py-8">{t?.event?.notFound || 'Event not found'}</div>

  return (
    <>
    {isLoading && <Loading />}
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-6">{dataDetail?.name}</h1>
      <div className="space-y-4">
        <p><strong>{t?.event?.date || 'Date'}:</strong> {dataDetail?.eventTime ?? ''}</p>
        <div>
          <strong>{t?.event?.description || 'Description'}:</strong>
          <p dangerouslySetInnerHTML={{__html: dataDetail?.description as string }}></p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleTransactions}>{t?.event?.registerNow || 'InitTransaction'}</Button>
          <Button onClick={handleOpenModalSearch}>
            <Search className="w-4 h-4 mr-2" />
            {t?.search?.searchPhotos || 'Search Photos'}
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t?.event?.photos || 'Event Photos'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleModalSearch}
        onUpload={handleUpload}
        facesData={facesData}
        onBuy={handleBuy}
      />
      <ModalQR isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)}/>
    </div>
    </>
  )
}

