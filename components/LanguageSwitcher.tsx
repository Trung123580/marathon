'use client'

import { Button } from '@/components/ui/button'
import useTranslations from '@/hooks/useTranslations'

const LanguageSwitcher = () => {
  const { locale, changeLanguage } = useTranslations()

  const handleLanguageChange = () => {
    const newLocale = locale === 'vi' ? 'en' : 'vi'
    changeLanguage(newLocale)
    window.location.reload() // Reload the page to apply the new language
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLanguageChange}
      className="text-sm font-medium text-yellow-300 transition-colors duration-200"
    >
      {locale === 'vi' ? 'English' : 'Tiếng Việt'}
    </Button>
  )
}

export default LanguageSwitcher

