'use client'
import React, { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTranslations from '@/hooks/useTranslations'


interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (searchTerm: string, selectedFace: number | null) => void
  onUpload: (file: File | null) => void
  facesData: any[]
  onDelete: (faceId: string) => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, onUpload, facesData, onDelete }) => {
  const { t }: { t: any } =  useTranslations()
  const [modalSearchInput, setModalSearchInput] = useState('')
  const [selectedFace, setSelectedFace] = useState<number | null>(null)
  const [error, setError] = useState('')
  const refInput = useRef<HTMLInputElement | null>(null)
  
  const handleModalSearch = () => {
    if (modalSearchInput.length > 0 && modalSearchInput.length < 4) {
      setError(t?.search?.searchBib || 'Keywords longer than 4 characters')
      return
    }
    onSearch(modalSearchInput, selectedFace)
    onClose()
    setModalSearchInput('')
    setSelectedFace(null)
    if (refInput.current) refInput.current.value = ''
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size >= 10 * 1024 * 1024) {
        (event.target as HTMLInputElement).value = ''
        return alert('File size is too large')
      }
      onUpload(event.target.files[0])
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t?.search?.advancedSearch || "Advanced Search"}</DialogTitle>
          <DialogDescription>
            {t?.search?.advancedSearchDescription || "Use the options below to perform an advanced search."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modalSearchInput" className="col-span-4">
              {t?.search?.searchTerm || "Search Term"}
            </Label>
            <Input
              id="modalSearchInput"
              value={modalSearchInput}
              onChange={(e) => setModalSearchInput(e.target.value)}
              className="col-span-4"
              placeholder={t?.search?.searchPlaceholder || "Enter search term"}
            />
          </div>
          {!!error && <span className='w-full text-red-500 text-sm'>{error}</span>}
          <div className="">
            <Label className="">
              {t?.search?.selectFace || "Select a face to search"}
            </Label>
           {facesData.length > 0 &&  <div className="flex gap-[13px] overflow-auto flex-wrap  overflow-y-auto max-h-[100px]">
            {/* max-w-[363px] md:max-w-[550px] */}
              {facesData.map((face) => (
                <div
                  key={face.faceId}
                  className={`relative cursor-pointer`}
                  onClick={() => setSelectedFace(face.faceKey)}
                >
                  <img
                    src={face.faceUrl}
                    alt={face.userId}
                    className="rounded-md min-w-16 w-16 h-16 object-cover border border-red-200"
                  />
                  <button className='absolute top-0 right-0 bg-black/30 p-0.5 z-10' onClick={()=>onDelete(face.faceId)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#fff"
                        height={12}
                        width={12}
                        viewBox="0 0 460.775 460.775"
                        xmlSpace="preserve"
                      >
                        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                    </svg>
                  </button>
                  {selectedFace === face.faceKey && (
                    <div className="absolute w-full h-full inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 rounded-md border-[3px] border-red-500">
                      <Check className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="col-span-4">
              {t?.search?.uploadFile || "Upload File"}
            </Label>
            <Input
              id="file"
              type="file"
              ref={refInput}
              onChange={handleFileChange}
              className="col-span-4"
              accept='image/jpeg'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleModalSearch}>
            {t?.search?.searchButton || "Search"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal

