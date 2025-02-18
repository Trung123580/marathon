"use client"
import ModalQR from "@/components/ModalQR"
import { Button } from "@/components/ui/button"
import useTranslations from "@/hooks/useTranslations"
import { formatNumber, formatViToEN } from "@/utils/helpers"
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
  const headerTables = ["preview", "Gift",  "transCode", "eventCode","finalPrice", "updatedAt", "status"]
  const handleTransactions = async ({price, transCode}: {price: number, transCode: string}) => {
    setIsQRModalOpen(true)
    setPaymentInfo({
      price: price,
      transCode: transCode
    })
  }
  console.log(dataHistory)
  
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
              const {lastDate} = formatViToEN(updatedAt)
              return (
                <tr key={id} className='bg-white border-b font-medium text-sm text-black border-gray-200'>
                  <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap '>
                    <button className={`py-2 px-4 rounded-md text-white ${status === "PAID" ? "bg-blue-500" : "bg-primary"}`}>
                      <a target='_blank' className='px-4 w-full h-full flex items-center justify-center' href={contentPreview}>
                        {t?.search.view}
                      </a>
                    </button>
                  </th>
                  <td className='px-6 py-4'>
                    {finalPrice >= 600000 ? (
                      <a href="https://drive.google.com/drive/folders/1dkZCcXDHYvitJIIj7fUxOkVIytqDvw7F" target="_blank" className="py-2 hover:opacity-90 block w-max px-4 rounded-md bg-red-500">
                        <svg xmlns='http://www.w3.org/2000/svg' width={17} hanging={17} viewBox='0 0 512 512'>
                          <path fill="white" d='M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z' />
                        </svg>
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className='px-6 py-4'>{transCode}</td>
                  <td className='px-6 py-4'>{eventCode}</td>
                  <td className='px-6 py-4'>{formatNumber(finalPrice)} đ</td>
                  <td className='px-6 py-4'>{lastDate}</td>
                  <td className='px-6 py-4 text-center'>{status === "PENDING" ? <Button onClick={() => handleTransactions({ price, transCode })}>{status}</Button> : <Button>{status}</Button>}</td>
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
