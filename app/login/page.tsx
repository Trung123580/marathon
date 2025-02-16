'use client'

import { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import useTranslations from '@/hooks/useTranslations'

export default function Login() {
  const { t, locale }: {t:any, locale:any} = useTranslations()
  const [error, setError] = useState('')
  const [stateDataForm, setStateDataFrom] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {email,password} = stateDataForm

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 4){
      setError(locale === 'en' ? 'The password must be longer than 4 characters' : 'Mật khẩu phải dài hơn 4 ký tự')
      return
    }
    const success = await login(email, password)
    if (success) {
      router.replace('/')
    } else {
      setError(t?.login?.error || 'Invalid email or password')
    }
  }
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value.toLowerCase().trim()
    setStateDataFrom(prev => ({...prev, [name]: value}))
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{t?.login?.title || 'Login'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{t?.login?.email || 'Email'}</Label>
            <Input 
              id="email" 
              type="email" 
              name='email'
              value={email}
              onChange={handleChangeInputValue}
              placeholder={t?.login?.email || 'Email'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="password">{t?.login?.password || 'Password'}</Label>
            <Input 
              id="password" 
              name='password' 
              type="password" 
              value={password}
              onChange={handleChangeInputValue}
              placeholder={t?.login?.password || 'Password'} 
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">{t?.login?.submit || 'Submit'}</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t?.login?.noAccount || "Don't have an account?"}{' '}
          <Link href="/register" className="text-primary hover:underline">
            {t?.login?.register || 'Register here'}
          </Link>
        </p>
        <p className="mt-4 text-center text-sm">
          {/* {locale === 'en' ? 'Carry out the password? ' : 'Thực hiện mật khẩu? '} */}
          <Link href="/forgot-password" className="text-primary hover:underline">
            {locale === 'en'? 'Forgot password' : 'Quên mật khẩu'}
          </Link>
        </p>
        {/* <p className="mt-4 text-center text-sm">
          {locale === 'en' ? 'Password change? ' : 'Thay đổi mật khẩu? '}
          <Link href="/change-password" className="text-primary hover:underline">
            {locale === 'en'? 'Password change' : 'Thay đổi mật khẩu'}
          </Link>
        </p> */}
      </div>
    </div>
  )
}

