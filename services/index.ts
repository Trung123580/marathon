
import axiosInstance from './base'
export const registerUser = async ({email, password}: {email:string, password:string}) => {
    try {
        const response = await axiosInstance.post(`/Auth/Register`, {
            email,
            password
        }, { validateStatus: (status) => status === 200 })
        return {
            status: true,
            data: response.data,
        }
    } catch (error: any) {
        return {
            status: false,
            data: {
                vi: 'Người dùng đã tồn tại',
                en: 'User already exists'
            } 
        }
    }
}