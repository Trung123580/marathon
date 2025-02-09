import EventDetail from '@/components/EventDetail'
import { getEventDetail, getPhotosByEventCode } from '@/services'
import { uuidv4 } from '@/utils/helpers'
import React from 'react'

const page = async ({ params, searchParams }: {searchParams?: {[key: string]: string | string[] | undefined}, params: { code: string } }) => {
  const code = params.code
  const page = searchParams?.page ?? 1
  const {data} = await getEventDetail({code: code, source: process.env.NEXT_PUBLIC_SOURCE as string})
  const {data:PhotoData} = await getPhotosByEventCode({eventCode:code, page: Number(page)})
  return (
    <EventDetail key={uuidv4()} dataDetail={data} dataPhotoList={PhotoData} page={Number(page)}/>
  )
}

export default page