import axios, {CreateAxiosDefaults} from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  timeout: 100000,
} as CreateAxiosDefaults)

export default axiosInstance
