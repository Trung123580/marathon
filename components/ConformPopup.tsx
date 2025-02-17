"use client"
import React  from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  callBack: (item?:any, item2?:any) => void
  title: string
  description: string
}

const ConformPopup: React.FC<SearchModalProps> = ({ isOpen, onClose, callBack, title, description }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <h3 className="text-lg font-medium">{description}</h3>
        <div className="flex items-center justify-end gap-4">
            <Button onClick={onClose}>Quay lại</Button>
            <Button onClick={callBack}>Xác nhận </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConformPopup
