"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import useTranslations from "@/hooks/useTranslations"
import { forgotPassword } from "@/services"

export default function ForgotPassword() {
  const { locale }: { t: any; locale: any } = useTranslations()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const resetPassword = async (email: string): Promise<boolean> => {
    const { status } = await forgotPassword({ email: email.trim().toLowerCase() })
    return status
  }
  const isLocale = locale === "en" ? true : false

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const result = await resetPassword(email)
      if (result) {
        setSuccess(isLocale ? "Password reset email sent" : "Đã gửi email đặt lại mật khẩu")
        // setTimeout(() => router.push("/login"), 5000)
      } else {
        setError(isLocale ? "Email not found" : "Không tìm thấy email")
      }
    } catch (error) {
      setError(isLocale ? "An error occurred" : "Một lỗi đã xảy ra")
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>{isLocale ? "Forgot Password" : "Quên mật khẩu"}</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='email'>{isLocale ? "Email" : "Email"}</Label>
            <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isLocale ? "Email" : "Email"} required />
          </div>
          {error && (
            <p className='text-red-500' role='alert'>
              {error}
            </p>
          )}
          {success && (
            <p className='text-green-500' role='alert'>
              {success}
            </p>
          )}
          <Button type='submit' className='w-full'>
            {isLocale ? "Reset Password" : "Đặt lại mật khẩu"}
          </Button>
        </form>
        <p className='mt-4 text-center text-sm'>
          {isLocale ? "Remember your password?" : "Đăng nhập tại đây?"}{" "}
          <Link href='/login' className='text-primary hover:underline'>
            {isLocale ? "Login here" : "Đăng nhập"}
          </Link>
        </p>
      </div>
    </div>
  )
}
