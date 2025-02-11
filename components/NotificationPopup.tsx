"use client"
import React  from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import useTranslations from "@/hooks/useTranslations"
import { Button } from "./ui/button"
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  des: string,
  headerInfo: string
}

const NotificationPopup: React.FC<SearchModalProps> = ({ isOpen, onClose, des, headerInfo }) => {
  const { t }: { t: any } = useTranslations()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          {/* <DialogTitle>{t?.event?.headerNotification || "Notification !"}</DialogTitle> */}
          <DialogTitle>{headerInfo}</DialogTitle>
        </DialogHeader>
        {/* <p>{t?.event?.notification || "This is just a thumbnail image, if you want to download the photo, click to see the photo and download the high quality photos!"}</p> */}
        <p>{des}</p>
        <div className="flex items-center justify-end gap-4">
            <Button onClick={onClose}>{t?.event?.back || 'Back'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationPopup