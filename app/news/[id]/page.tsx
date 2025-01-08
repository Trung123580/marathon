'use client'
import useTranslations from '@/hooks/useTranslations'

export default function NewsDetail({ params }: { params: { id: string } }) {
  const { t }: { t: any } =  useTranslations()
  const newsId = params.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">News Title</h1>
        <p className="text-sm text-gray-500 mb-4">{t?.newsDetail.publishedOn}: May 15, 2023</p>
        <div className="prose max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
            interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
          </p>
          <p>
            Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl
            nunc euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
            tincidunt nisl nunc euismod nunc.
          </p>
        </div>
      </div>
    </div>
  )
}

