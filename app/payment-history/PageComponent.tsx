"use client"
import ModalQR from "@/components/ModalQR"
import { Button } from "@/components/ui/button"
import useTranslations from "@/hooks/useTranslations"
import React, { useState } from "react"
type PaymentHistory = {
  eventCode: string,
  contentPreview: string, 
  finalPrice: number, 
  updatedAt: string,
  status: 'PAID' | 'MISS' | 'ERROR' | 'PENDING'
  id: string,
  price: number,
  transCode: string
}
const PageComponent = ({ dataHistory }: { dataHistory: PaymentHistory[] }) => {
  const { t } =  useTranslations()
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [paymentInfo , setPaymentInfo] = useState<Payment>({
    price: 0,
    transCode: ''
  })
  const headerTables = ["contentPreview", "eventCode", "finalPrice", "updatedAt", "status"]
  const handleTransactions = async ({price, transCode}: {price: number, transCode: string}) => {
    setIsQRModalOpen(true)
    setPaymentInfo({
      price: price,
      transCode: transCode
    })
  }
  return (
    <>
      <section className='mt-10 container mx-auto px-4 max-w-[1400px]'>
      <h1 className='text-3xl font-bold mb-3'>{t?.common?.historyPayment}</h1>
      <div className='relative overflow-x-auto mb-6 overflow-y-auto max-h-[50vh]'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
          <thead className='text-sm text-gray-700 uppercase bg-gray-200 '>
            <tr>
              {headerTables.map((text) => {
                return (
                  <th key={text} scope='col' className={`px-6 py-3 ${text === 'status' ? 'text-center' :''}`}>
                    {text}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {dataHistory.map(({ contentPreview, eventCode, finalPrice, updatedAt, status, id, price ,transCode }) => {
              return (
                <tr key={id} className='bg-white border-b font-medium text-sm text-black border-gray-200'>
                  <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap '>
                    <Button className="p-0">
                      <a target="_blank" className="px-4 w-full h-full flex items-center justify-center" href={contentPreview}>{t?.search.view}</a>
                     </Button>
                  </th>
                  <td className='px-6 py-4'>{eventCode}</td>
                  <td className='px-6 py-4'>{finalPrice}</td>
                  <td className='px-6 py-4'>{updatedAt}</td>
                  <td className='px-6 py-4 text-center'>
                    {status === 'PENDING' ? <Button onClick={() =>handleTransactions({price, transCode})}>{status}</Button> : <span>{status}</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
    <ModalQR isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} paymentInfo={paymentInfo}/>
    </>
  )
}

export default PageComponent
