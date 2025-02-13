"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"
import useTranslations from "@/hooks/useTranslations"
import { useAuth } from "@/contexts/AuthContext"
import { uuidv4 } from "@/utils/helpers"

export default function Header() {
  const { t }: { t: any } = useTranslations()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout, isAuth } = useAuth()
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { href: `/`, label: t?.common?.home || "Trang chủ", icon: Home },
    // { href: `/about`, label: t?.common?.about || 'Giới thiệu' },
    // { href: `/contact`, label: t?.common?.contact || 'Liên hệ' },
    { href: `/change-password`, label: t?.common?.changepassword || "changepassword" },
    { href: `/forgot-password`, label: t?.common?.forgotpassword || "forgotpassword" },
    { href: `/payment-history`, label: t?.common?.historyPayment || "historyPayment" },
  ]
  return (
    <header className='sticky top-0 z-50 w-full bg-gradient-to-r from-[#fd652c] to-[#eb172b] text-white'>
      {/* border-b */}
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center'>
        <div className='flex items-center space-x-2'>
          <a href={"/"}>
            <h1 className='font-bold text-xl text-white'>Ảnh Sự Kiện Marathon</h1>
          </a>
        </div>
        <nav className='hidden md:flex ml-auto items-center space-x-4 lg:space-x-6'>
          {navItems.map((item) => {
            if (item.href === "/change-password" || item.href === "/forgot-password" || item.href === "/payment-history") return <React.Fragment key={uuidv4()}></React.Fragment>
            return (
              <Link key={uuidv4()} href={item.href} className='text-sm font-medium h-10 text-white hover:text-white/80 flex items-center justify-center space-x-2 '>
                {item.icon && <item.icon className='w-4 h-4 relative -top-[2.7px]' />}
                <span >{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className='hidden md:flex ml-4 items-center space-x-4 justify-center'>
          {isAuth ? (
            <div className='relative group w-7 h-6 min-w-7'>
              <button className='w-full h-full border p-1 rounded-sm flex items-center justify-center'>
                <svg width={16} height={16} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path fill="white" d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z' />
                </svg>
              </button>
              <ul className='group-hover:block hidden absolute top-full left-1/2 -translate-x-1/2 rounded-md bg-slate-800 *:text-nowrap px-4 py-2 text-sm *:py-1'>
                <li className='hover:text-white/80'>
                  <button onClick={handleLogout}>{t?.common?.logout || "Logout"}</button>
                </li>
                <li className='hover:text-white/80'>
                  <Link href='/change-password'>{t?.common?.changepassword || "changepassword"}</Link>
                </li>
                <li className='hover:text-white/80'>
                  <Link href='/forgot-password'>{t?.common?.forgotpassword || "forgotpassword"}</Link>
                </li>
                <li className='hover:text-white/80'>
                  <Link href='/payment-history'>{t?.common?.historyPayment || "historyPayment"}</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href={`/login`} className='text-sm font-medium text-white hover:text-white/80'>
                {t?.common?.login || "Login"}
              </Link>
            </>
          )}
        </div>
        <div className='flex items-center ml-auto md:ml-4'>
          <LanguageSwitcher />
          <Button variant='ghost' size='icon' className='ml-2 md:hidden' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className='md:hidden max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex flex-col space-y-4 p-4'>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className='text-sm font-medium hover:text-white/80 flex items-center space-x-2' onClick={() => setIsMobileMenuOpen(false)}>
                {item.icon && <item.icon className='w-4 h-4' />}
                <span>{item.label}</span>
              </Link>
            ))}
            {isAuth ? (
              <>
                <button onClick={handleLogout} className='text-sm font-medium text-white hover:text-white/80'>
                  {t?.common?.logout || "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link href={`/login`} className='text-sm font-medium text-white hover:text-white/80' onClick={() => setIsMobileMenuOpen(false)}>
                  {t?.common?.login || "Login"}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
