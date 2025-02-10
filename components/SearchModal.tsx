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
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, onUpload, facesData }) => {
  const { t }: { t: any } =  useTranslations()
  const [modalSearchInput, setModalSearchInput] = useState('')
  const [selectedFace, setSelectedFace] = useState<number | null>(null)
  const refInput = useRef<HTMLInputElement | null>(null)
  
  const handleModalSearch = () => {
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
                  onClick={() => setSelectedFace(face.faceId)}
                >
                  <img
                    src={face.faceUrl}
                    alt={face.userId}
                    className="rounded-md min-w-16 w-16 h-16 object-cover border border-red-200"
                  />
                  {selectedFace === face.faceId && (
                    <div className="absolute w-full h-full inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 rounded-md">
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

