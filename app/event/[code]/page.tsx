import EventDetail from '@/components/EventDetail'
import { getEventDetail, getPhotos } from '@/services'
import { uuidv4 } from '@/utils/helpers'
import React from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { cookies } from "next/headers"
 
type Props = {
  params: Promise<{ code: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const code = (await params).code
  const {data} = await getEventDetail({code: code, source: process.env.NEXT_PUBLIC_SOURCE as string})
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: data?.name ?? 'Marathon Event Photo',
    openGraph: {
      title: data?.name ?? 'Marathon Event Photo',
      images: [data?.banner, ...previousImages],
      description: data?.description ?? 'Capture your marathon moments'
    },
  }
}
 
const page = async ({ params, searchParams }: Props) => {
  const code = (await params).code ?? ''
  const page = (await searchParams).page ?? 1
  const query = (await searchParams).query ?? ''
  const face = (await searchParams).face ?? ''
  const {data} = await getEventDetail({code: code, source: process.env.NEXT_PUBLIC_SOURCE as string})
  const cookiesParam = await cookies()
  const token = cookiesParam.get("token-app")?.value ?? ""
  const {data:PhotoData} = await getPhotos({eventCode:code, page: Number(page), token: token, face: String(face), query: String(query)})
  return (
    <EventDetail key={uuidv4()} dataDetail={data} code={code} dataPhotoList={PhotoData} page={Number(page)}/>
  )
}

export default page