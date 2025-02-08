import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export const handleSetCookie = ({ key, value }: { key: string; value: string }) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000) // 1 giờ (1 giờ * 60 phút * 60 giây * 1000ms)

  setCookie(key, value, { expires }) 
}

export const handleGetCookie = ({ key }: { key: string }) => {
  return getCookie(key)
}

export const handleDeleteCookie = ({ key }: { key: string }) => {
  deleteCookie(key)
}
