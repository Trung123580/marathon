'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'

const useTranslations = () => {
  const [locale, setLocale] = useState<'en' | 'vi'>('en')

  useEffect(() => {
    const savedLocale = getCookie('NEXT_LOCALE') as 'en' | 'vi'
    setLocale(savedLocale || 'en')
  }, [])

  const t = locale === 'en' ? en : vi

  const changeLanguage = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale)
    setCookie('NEXT_LOCALE', newLocale, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
  }

  return { t, locale, changeLanguage }
}

export default useTranslations

