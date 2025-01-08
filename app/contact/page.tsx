'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useTranslations from '@/hooks/useTranslations'

export default function Contact() {
  const { t }: { t: any } =  useTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{t?.contact?.title || 'Contact Us'}</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">{t?.contact?.name || 'Name'}</Label>
            <Input id="name" type="text" placeholder={t?.contact?.name || 'Name'} />
          </div>
          <div>
            <Label htmlFor="email">{t?.contact?.email || 'Email'}</Label>
            <Input id="email" type="email" placeholder={t?.contact?.email || 'Email'} />
          </div>
          <div>
            <Label htmlFor="message">{t?.contact?.message || 'Message'}</Label>
            <Textarea id="message" placeholder={t?.contact?.message || 'Your message'} className="min-h-[100px]" />
          </div>
          <Button type="submit" className="w-full">{t?.contact?.send || 'Send'}</Button>
        </form>
      </div>
    </div>
  )
}

