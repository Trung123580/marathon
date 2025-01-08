'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTranslations from '@/hooks/useTranslations'

export default function Register() {
  const { t }: {t:any} = useTranslations()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError(t?.register?.passwordMismatch || 'Passwords do not match')
      return
    }
    // Here you would typically call an API to register the user
    console.log('Registering user:', { name, email, password })
    // For now, let's just redirect to the login page
    router.push('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{t?.register?.title || 'Register'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t?.register?.name || 'Name'}</Label>
            <Input 
              id="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t?.register?.name || 'Name'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="email">{t?.register?.email || 'Email'}</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t?.register?.email || 'Email'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="password">{t?.register?.password || 'Password'}</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t?.register?.password || 'Password'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t?.register?.confirmPassword || 'Confirm Password'}</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

