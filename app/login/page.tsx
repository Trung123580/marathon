'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import useTranslations from '@/hooks/useTranslations'

export default function Login() {
  const { t }: { t: any } =  useTranslations()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = await login(email, password)
    if (success) {
      router.push('/')
    } else {
      setError(t?.login?.error || 'Invalid email or password')
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t?.login?.email || 'Email'} 
              required
            />
          </div>
          <div>
            <Label htmlFor="password">{t?.login?.password || 'Password'}</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
  )
}

