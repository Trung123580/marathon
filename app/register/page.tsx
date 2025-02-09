'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTranslations from '@/hooks/useTranslations'
import { registerUser } from '@/services'
import Loading from '@/components/Loading'

export default function Register() {
  const { t, locale }: {t:any, locale:any} = useTranslations()
  // const [name, setName] = useState('')
  const [stateDataForm, setStateDataFrom] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {confirmPassword,email,password} = stateDataForm
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    if (password.length < 4 || confirmPassword.length < 4){
      setError(locale === 'en' ? 'The password must be longer than 4 characters' : 'Mật khẩu phải dài hơn 4 ký tự')
      return
    }
    if (password !== confirmPassword) {
      setError(locale === 'en' ? 'Passwords do not match' : 'Mật khẩu không khớp')
      return
    }
    const {data, status} = await registerUser({ email, password})
    if (status){
      console.log(data)
      alert('register success')
      router.push('/login')
    }else {
      setError(locale === 'en' ? data?.en ?? 'There is an error that occurs' : data?.vi ?? 'có lỗi sảy ra')
    }
    (e.target as HTMLFormElement).reset()
    setIsLoading(false)
    setStateDataFrom({email: '', password: '', confirmPassword: ''})
    // For now, let's just redirect to the login page
  }
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value.toLowerCase().trim()
    setStateDataFrom(prev => ({...prev, [name]: value}))
  }
  if (isLoading) return <Loading />
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{t?.register?.title || 'Register'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{t?.register?.email || 'Email'}</Label>
            <Input 
              id="email" 
              type="email" 
              name='email'
              value={email}
              onChange={handleChangeInputValue}
              placeholder={t?.register?.email || 'Email'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="password">{t?.register?.password || 'Password'}</Label>
            <Input 
              id="password" 
              type="password"
              name='password'
              value={password}
              onChange={handleChangeInputValue}
              placeholder={t?.register?.password || 'Password'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t?.register?.confirmPassword || 'Confirm Password'}</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={handleChangeInputValue}
              placeholder={t?.register?.confirmPassword || 'Confirm Password'} 
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">{t?.register?.submit || 'Submit'}</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t?.register?.haveAccount || 'Already have an account?'}{' '}
          <Link href="/login" className="text-primary hover:underline">
            {t?.register?.login || 'Login here'}
          </Link>
        </p>
      </div>
    </div>
  )
}

