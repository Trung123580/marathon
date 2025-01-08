'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Check, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTranslations from '@/hooks/useTranslations'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (searchTerm: string, file: File | null, selectedFace: number | null) => void
}

const mockFaces = [
  { id: 1, src: '/placeholder.svg?height=100&width=100', alt: 'Face 1' },
  { id: 2, src: '/placeholder.svg?height=100&width=100', alt: 'Face 2' },
  { id: 3, src: '/placeholder.svg?height=100&width=100', alt: 'Face 3' },
  { id: 4, src: '/placeholder.svg?height=100&width=100', alt: 'Face 4' },
  { id: 5, src: '/placeholder.svg?height=100&width=100', alt: 'Face 5' },
]

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const { t }: { t: any } =  useTranslations()
  const [modalSearchInput, setModalSearchInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFace, setSelectedFace] = useState<number | null>(null)

  const handleModalSearch = () => {
    onSearch(modalSearchInput, selectedFile, selectedFace)
    onClose()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="col-span-4">
              {t?.search?.uploadFile || "Upload File"}
            </Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="col-span-4"
            />
          </div>
          <div className="grid gap-4">
            <Label className="col-span-4">
              {t?.search?.selectFace || "Select a face to search"}
            </Label>
            <div className="grid grid-cols-5 gap-4">
              {mockFaces.map((face) => (
                <div
                  key={face.id}
                  className={`relative cursor-pointer ${
                    selectedFace === face.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedFace(face.id)}
                >
                  <Image
                    src={face.src}
                    alt={face.alt}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  {selectedFace === face.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-50 rounded-md">
                      <Check className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
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

