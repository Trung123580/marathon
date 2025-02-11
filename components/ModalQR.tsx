"use client"
import React  from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import useTranslations from "@/hooks/useTranslations"
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  paymentInfo: Payment
}

const ModalQR: React.FC<SearchModalProps> = ({ isOpen, onClose, paymentInfo }) => {
  const { t }: { t: any } = useTranslations()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t?.event?.qrtitle || "QR Payment"}</DialogTitle>
        </DialogHeader>
        <img className='w-full h-auto' src={`https://img.vietqr.io/image/MB-0610123456666-gWTENBY.png?accountName=Ph%E1%BA%A1m%20Th%C3%A0nh%20Trung&amount=${paymentInfo.price}&addInfo=${paymentInfo.transCode}`} />
      </DialogContent>
    </Dialog>
  )
}

export default ModalQR
