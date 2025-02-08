'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Home } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import useTranslations from '@/hooks/useTranslations'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { t }: { t: any } =  useTranslations()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout, isAuth } = useAuth()
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { href: `/`, label: t?.common?.home || 'Trang chủ', icon: Home },
    { href: `/about`, label: t?.common?.about || 'Giới thiệu' },
    { href: `/contact`, label: t?.common?.contact || 'Liên hệ' },
    // { href: `/change-password`, label: t?.common?.contact || 'Liên hệ' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#fd652c] to-[#eb172b] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">Ảnh Sự Kiện Marathon</span>
        </div>
        <nav className="hidden md:flex ml-auto items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-white/80 flex items-center space-x-2"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex ml-4 items-center space-x-4">
          {isAuth ? (
            <>
              <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-white/80">
                {/* {t?.common?.logout || 'Logout'} */}
                logo app 
              </button>
              <ul>
                  <li>{t?.common?.logout || 'Logout'}</li>
                  <li>{t?.common?.changepassword || 'changepassword'}</li>
                  <li>{t?.common?.forgotpassword || 'forgotpassword'}</li>
                </ul>
            </>
          ) : (
            <>
              <Link href={`/login`} className="text-sm font-medium text-white hover:text-white/80">
                {t?.common?.login || 'Login'}
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center ml-auto md:ml-4">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-white/80 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
            {isAuth ? (
              <>
                <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-white/80">
                  {t?.common?.logout || 'Logout'}
                </button>
                <ul>
                  <li>logout</li>
                  <li>changePassword</li>
                  <li>forgotPassword</li>
                </ul>
              </>
            ) : (
              <>
                <Link
                  href={`/login`}
                  className="text-sm font-medium text-white hover:text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t?.common?.login || 'Login'}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

