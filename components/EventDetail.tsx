"use client"

import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import useTranslations from "@/hooks/useTranslations"
import SearchModal from "@/components/SearchModal"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useIsMobile } from "./ui/use-mobile"
import Loading from "./Loading"
import { getBase64StringFromDataURL, handleGetCookie, jwtDecodeToken, uuidv4 } from "@/utils/helpers"
import { getPackages, getPhotos, getUserFaces, postInitTransaction, postRemoveFace, uploadFile } from "@/services"
import ModalQR from "./ModalQR"
import ConformPopup from "./ConformPopup"
import WrapperMasonry from "./WrapperMasonry"
import NotificationPopup from "./NotificationPopup"
import PackagesPopup from "./PackagesPopup"
type photoItem = {
  finalKey: string
  id: string
  publicThumbUrl: string
  publicUrl: string
}
type PhotoList = {
  imageKey: string
  photoItems: photoItem[]
  totalItems: number
  totalPages: number
}
// export const metadata = {
//   title: 'About',
// }
export default function EventDetail({ dataDetail, dataPhotoList, page, code }: { code: string; page: number; dataPhotoList: PhotoList; dataDetail: any }) {
  const { t }: { t: any } = useTranslations()
  const router = useRouter()
  const pathName = usePathname()
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const queryParams = (searchParams.get("query") as string) ?? ""
  const faceParams = (searchParams.get("face") as string) ?? ""
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isNotification, setIsNotification] = useState(false)

  const [conform, setConform] = useState({
    state: false,
    faceId: "",
  })
  const [conformFace, setConformFace] = useState({
    state: false,
    searchTermValue: ""
  })

  const [statePhoto, setStatePhoto] = useState({
    dataPhotos: dataPhotoList?.photoItems ?? [],
    totalPages: dataPhotoList?.totalPages ?? 1,
  })

  const [paymentInfo, setPaymentInfo] = useState<Payment>({
    price: 0,
    transCode: "",
  })
  
  const [statePackages, setStatePackages] = useState<{data: PackagesItem[], state: boolean}>({
    data: [],
    state: false
  })
  console.log(statePackages.data);
  
  const { dataPhotos, totalPages } = statePhoto
  const [isLoading, setIsLoading] = useState(false)
  const [facesData, setFacesData] = useState([])
  const token = handleGetCookie({ key: "token-app" }) as string
  const handleCallBackSearchFace = useCallback(
    async (searchTerm?: string, selectedFace?: string | null) => {
      if (!dataDetail) return
      setIsLoading(true)
      
      const { data, status } = await getPhotos({ eventCode: dataDetail.code, face: selectedFace?.toString(), query: searchTerm, page: 1, token: token })
      const dataResponse = data as PhotoList
      // setStatePhoto({dataPhotos: [] ,totalPages: 1})
      if (!status) {
        alert("search failed")
        return
      }
      setStatePhoto({
        dataPhotos: [...dataResponse.photoItems],
        totalPages: dataResponse.totalPages,
      })
      const newSearchParams = new URLSearchParams({ query: searchTerm ?? '', face: '' })
      window.history.replaceState(null, "", pathName + "?" + newSearchParams.toString())
      setIsLoading(false)
      setConformFace({
        state: false,
        searchTermValue: ''
      })
      // if (page) router.push(`${pathName}`)
    },
    [dataDetail, token, page]
  )
  const handleOpenModalPackages = async (item: PackagesItem) => {
    const finalKey = item.packageType
    const packageCode = item.packageCode
    setStatePackages(prev => ({...prev, state: true}))
    await handleTransactions({ finalKey: finalKey , packageCode: packageCode, })
  }
  const handleModalSearch = useCallback(
    async (searchTerm?: string, selectedFace?: string | null) => {
      if (!dataDetail) return
      if (!selectedFace && searchTerm) {
        setConformFace({
          state: true,
          searchTermValue: searchTerm as string
        })
        return
      }
      setIsLoading(true)
      const { data, status } = await getPhotos({ eventCode: dataDetail.code, face: selectedFace?.toString(), query: searchTerm, page: 1, token: token })
      const dataResponse = data as PhotoList
      // setStatePhoto({dataPhotos: [] ,totalPages: 1})
      if (!status) {
        alert("search failed")
        return
      }
      setStatePhoto({
        dataPhotos: [...dataResponse.photoItems],
        totalPages: dataResponse.totalPages,
      })
      let newSearchParams: any
      if (searchTerm && ! selectedFace) {
        newSearchParams = new URLSearchParams({ query: searchTerm ?? '', page: String(1) })
      }
      newSearchParams = new URLSearchParams({ query: searchTerm ?? '', face: selectedFace?.toString() || "", page: String(1) })
      window.history.replaceState(null, "", pathName + "?" + newSearchParams.toString())
      setIsLoading(false)
    },
    [dataDetail, token, page]
  )

  const handleGetUserFaces = useCallback(async () => {
    if (!token) return
    const { data } = await getUserFaces({ token: token })
    setFacesData(data?.data ?? [])
  }, [token])

  useEffect(() => {
    (async () => {
      const {data} = await getPackages({eventCode: code})
      setStatePackages(prev => ({...prev, data: data.filter((item: PackagesItem) => item.packageType === 'LINK')}))
    })()

    if (token) handleGetUserFaces()
  }, [token, code])
  const handleUpload = async (file: File | null) => {
    if (file) {
      if (!token) {
        window.location.href = "/login"
      }
      const nameFile = file?.name.split(".")[1] as string
      const base64String = await getBase64StringFromDataURL(file as File)
      const user = jwtDecodeToken({ token: token as string }) as any
      setIsLoading(true)
      const { status } = await uploadFile({ base64: base64String, userId: user?.unique_name, name: `${uuidv4()}.${nameFile}`, token: token as string })
      if (!status) alert("Error upload file size")
      await handleGetUserFaces()
      setIsLoading(false)
    }
  }
  const handleOpenModalSearch = () => {
    if (!token) {
      router.push("/login")
      return
    }
    setIsSearchModalOpen(true)
  }

  const handleTransactions = async ({ finalKey, publicUrl = "", packageCode }: {packageCode?:string,  publicUrl?: string; finalKey?: string }) => {
    if (!token) {
      router.push('/login')
      return
    }
    setIsQRModalOpen(true)
    setIsLoading(true)
    // const typeBuy = finalKey ? "ITEM" : "LINK"
    if (finalKey === "ITEM") {
      const { data, status } = await postInitTransaction({ token, eventCode: code, face: faceParams, query: queryParams, items: [publicUrl], type: 'ITEM' })
      // mua 1 ảnh
      if (status) setPaymentInfo({ price: data.price, transCode: data.transCode })
      setIsLoading(false)
      return
    }
    // mua tất cả
    const { data, status } = await postInitTransaction({ token, packageCode: packageCode, eventCode: code, face: faceParams, query: queryParams, type: 'LINK', items: [] })
    if (status) setPaymentInfo({ price: data.price, transCode: data.transCode })
    setIsLoading(false)
  }

  const handleDeleteFace = async (faceId: string) => {
    setConform({
      state: true,
      faceId,
    })
  }

  const handleCallBackDelete = useCallback(async () => {
    if (conform.state) {
      const { status, data } = await postRemoveFace({ token, faceId: conform.faceId })
      if (status) {
        setFacesData((prev) => {
          return prev.filter(({ faceId: id }) => id !== conform.faceId)
        })
      }
      setConform({ faceId: "", state: false })
      // const newSearchParams = new URLSearchParams()
      // window.history.replaceState(null, "", pathName + "?" + newSearchParams.toString())
    }
  }, [conform.state])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true)
      if (searchParams || faceParams) {
        // const newSearchParams = new URLSearchParams({ query: queryParams, face: faceParams, page: String(page)})
        // window.history.replaceState(null, "", pathName + "?" + newSearchParams.toString())
        router.push(`${pathName}?page=${page}&query=${queryParams}&face=${faceParams}`)
        return
      }
      router.push(`${pathName}?page=${page}`)
    }
  }
  const handleClickRightMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsNotification(true)
  }
  useEffect(() => {
    if (page) setIsLoading(false)
  }, [page])

 
  const maxVisiblePages = isMobile ? 4 : 7
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }
  
  if (!dataDetail){
    return (
      <div className='container mx-auto px-4 py-8 text-xl font-medium text-center underline'>
        <h3>{t?.event?.notFound || "Event not found"}</h3>
        <Button className='mt-7' onClick={() => window.history.back()}>
          {t?.event?.back}
        </Button>
      </div>
    )
  }
    
    
    
  return (
    <>
      {isLoading && <Loading />}
      <div className='relative md:h-[calc(75vh)]'>
        <Image src={dataDetail?.banner} layout='fill' objectFit='contain md:block' priority alt=''></Image>
        <Image src={dataDetail?.banner} width={1000} height={500} objectFit='contain md:hidden block w-full h-full' priority alt=''></Image>
      </div>
      <div className='container mx-auto px-4 py-8 max-w-[1400px]'>
        <h1 className='text-3xl font-bold mb-6'>{dataDetail?.name}</h1>
        <div className='space-y-4'>
          <p>
            <strong>{t?.event?.date || "Date"}:</strong> {dataDetail?.eventTime ?? ""}
          </p>
          <div>
            {/* <strong>{t?.event?.description || "Description"}:</strong> */}
            <p className="leading-8" dangerouslySetInnerHTML={{ __html: dataDetail?.description as string }}></p>
          </div>
          <div className='flex space-x-4'>
            {!!dataPhotos.length && (!!queryParams || !!faceParams) && <Button onClick={() => setStatePackages(prev => ({...prev, state: true}))}>{t?.event?.registerNow || "Buy this result"}</Button>}
            <Button onClick={handleOpenModalSearch}>
              <Search className='w-4 h-4 mr-2' />
              {t?.search?.searchPhotos || "Search Photos"}
            </Button>
          </div>
        </div>
        {dataPhotos.length === 0 ? (
          <>
            <div className='mt-12'>
              <h2 className='text-2xl font-bold mb-4'>{t?.event?.photos || "Event Photos"}</h2>
              <div className="h-[30vh] flex items-center justify-center">
                <h3 className='text-3xl font-medium'>{t?.event?.noPhotos || "No photos"}</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='mt-12'>
              <h2 className='text-2xl font-bold mb-4'>{t?.event?.photos || "Event Photos"}</h2>
              <WrapperMasonry data={dataPhotos} onClickRightMouse={handleClickRightMouse} onBuy={handleTransactions} />
            </div>
            <Pagination>
              <PaginationContent>
                {/* Nút Previous */}
                <PaginationItem>
                  <PaginationPrevious onClick={() => goToPage(page - 1)} href='' className={page === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>

                {/* Hiển thị nút "1" nếu cần */}
                {startPage > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
                    </PaginationItem>
                    {startPage > 2 && <PaginationEllipsis />}
                  </>
                )}

                {/* Hiển thị các trang trong phạm vi */}
                {[...Array(endPage - startPage + 1)].map((_, index) => {
                  const pageNumber = startPage + index
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink className={`w-8 h-8 ${page === pageNumber ? " bg-red-300" : ""}`} isActive={page === pageNumber} onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {/* Hiển thị nút "totalPages" nếu cần */}
                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {/* Nút Next */}
                <PaginationItem>
                  <PaginationNext onClick={() => goToPage(page + 1)} className={page === totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}

        <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} onSearch={handleModalSearch} onUpload={handleUpload} facesData={facesData} onDelete={handleDeleteFace} />
        <NotificationPopup
          isOpen={isNotification}
          onClose={() => setIsNotification(false)}
          des={t?.event?.notification || "This is just a thumbnail image, if you want to download the photo, click to see the photo and download the high quality photos!"}
          headerInfo={t?.event?.headerNotification || "Notification !"}
        />
        <ModalQR isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} paymentInfo={paymentInfo} />
        <ConformPopup isOpen={conform.state} description={t?.event?.deleteText} title={t?.event?.conform} onClose={() => setConform({ faceId: "", state: false })} callBack={handleCallBackDelete} />
        <ConformPopup isOpen={conformFace.state} description={t?.event?.descriptionBIB} title={t?.event?.titleSearchBIB} onClose={() => {
          setConformFace({ state: false, searchTermValue: "" })
          handleOpenModalSearch()
        }} callBack={() => handleCallBackSearchFace(conformFace.searchTermValue, faceParams)} />
        <PackagesPopup dataPackages={statePackages.data} callBack={handleOpenModalPackages} isOpen={statePackages.state} onClose={() => setStatePackages(prev => ({...prev,state: false}))}/>
      </div>
    </>
  )
}
