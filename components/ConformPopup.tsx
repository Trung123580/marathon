"use client"
import React  from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import useTranslations from "@/hooks/useTranslations"
import { Button } from '@/components/ui/button'
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  callBack: () => void
}

const ConformPopup: React.FC<SearchModalProps> = ({ isOpen, onClose, callBack }) => {
  const { t }: { t: any } = useTranslations()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t?.event?.conform || "Confirm delete ?"}</DialogTitle>
        </DialogHeader>
        <h3 className="text-lg font-medium">{t?.event?.deleteText || "You definitely want to delete photos ?"}</h3>
        <div className="flex items-center justify-end gap-4">
            <Button onClick={onClose}>Quay lại</Button>
            <Button onClick={callBack}>Xác nhận </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConformPopup
