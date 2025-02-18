import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { jwtDecode } from "jwt-decode";
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
export const uuidv4 = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  )
}
export const formatNumber = (num: number) => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0'
}
export const getBase64StringFromDataURL = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1]
      resolve(result)
    }
  })
}
export const jwtDecodeToken = ({token}:{token: string}) => {
  return jwtDecode(token)
}