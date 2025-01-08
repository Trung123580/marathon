'use client'
import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'

export default function Profile() {
  const { t }: { t: any } =  useTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">{t?.profile?.title}</h1> */}
        <div className="space-y-4 bg-white shadow rounded-lg p-6">
          {/* <p><strong>{t?.profile.name}:</strong> John Doe</p> */}
          {/* <p><strong>{t?.profile.email}:</strong> john@example.com</p> */}
          {/* <p><strong>{t?.profile.joined}:</strong> January 1, 2023</p> */}
          {/* <Button className="w-full sm:w-auto">{t?.profile.editProfile}</Button> */}
        </div>
      </div>
    </div>
  )
}

