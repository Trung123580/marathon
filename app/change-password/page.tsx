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
import { changePassword } from "@/services"
import { handleGetCookie } from "@/utils/helpers"

export default function ChangePassword() {
  const { locale }: { t: any; locale: any } = useTranslations()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    const token = handleGetCookie({key: 'token-app'}) as string
    const {status} = await changePassword({currentPassword, newPassword, token})
    // alert(status)
    // return status
    alert(status)
    return true
}
  const isLocale = locale === "en" ? true : false
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (newPassword.length < 4 || confirmPassword.length < 4){
        setError(locale === 'en' ? 'The password must be longer than 4 characters' : 'Mật khẩu phải dài hơn 4 ký tự')
        return
      }
    if (newPassword !== confirmPassword) {
      setError(locale === "en" ? "New Passwords do not match" : "Mật khẩu không khớp")
      return
    }

    try {
      const result = await handleChangePassword(currentPassword, newPassword)
      if (result) {
        setSuccess(isLocale ? "Password changed successfully" : "Mật khẩu đã thay đổi thành công")
        // setTimeout(() => router.push("/"), 2000)
      } else {
        setError(isLocale ? "Failed to change password" : "Không thay đổi mật khẩu")
      }
    } catch (error) {
      setError(isLocale ? "An error occurred" : "Một lỗi đã xảy ra")
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>{isLocale ? "Change Password" : "Thay đổi mật khẩu "}</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='currentPassword'>{isLocale ? "Current Password" : "Mật khẩu hiện tại"}</Label>
            <Input id='currentPassword' type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder={isLocale ? "Current Password" : "Mật khẩu hiện tại"} required />
          </div>
          <div>
            <Label htmlFor='newPassword'>{isLocale ? "New Password" : "Mật khẩu mới"}</Label>
            <Input id='newPassword' type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={isLocale ? "New Password" : "Mật khẩu mới"} required />
          </div>
          <div>
            <Label htmlFor='confirmPassword'>{isLocale ? "Confirm New Password" : "Xác nhận mật khẩu mới"}</Label>
            <Input id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={isLocale ? "Confirm New Password" : "Xác nhận mật khẩu mới"} required />
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
            {isLocale ? "Change Password" : "Thay đổi mật khẩu"}
          </Button>
        </form>
        <p className='mt-4 text-center text-sm'>
          <Link href='/' className='text-primary hover:underline'>
            {isLocale ? "Cancel and return to home" : "Về trang chủ"}
          </Link>
        </p>
      </div>
    </div>
  )
}
