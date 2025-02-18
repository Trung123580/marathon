"use client"
import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/utils/helpers"
interface PackagesModal {
  isOpen: boolean
  onClose: () => void
  callBack: (item?: any, item2?: any) => void
  dataPackages: PackagesItem[]
}
const PackagesPopup: React.FC<PackagesModal> = ({ isOpen, onClose, callBack, dataPackages }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Các gói mua ảnh !</DialogTitle>
        </DialogHeader>
        {dataPackages.map((item, index) => (
          <div key={index + item.eventCode} className='flex items-center border p-2 rounded-md shadow-md'>
            <div className='flex-1'>
              <h3 className=''>{item.packageName}</h3>
              <p className='text-sm text-gray-500'>{item.packageDescription}</p>
            </div>
            <div className="bg-secondary p-2 rounded-md mx-2 md:mx-4">
              {formatNumber(item.price)} đ
            </div>
            <Button onClick={() => callBack(item)}>Mua ngay</Button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default PackagesPopup
