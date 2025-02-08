
import axiosInstance from './base'
export const registerUser = async ({email, password}: {email:string, password:string}) => {
    try {
        const response = await axiosInstance.post(`/Auth/Register`, {
            email,
            password
        }, { validateStatus: (status) => status === 200 || status === 204 })
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
export const loginUser = async ({email, password}: {email:string, password:string}) => {
    try {
        const response = await axiosInstance.post(`/Auth/Login`, {
            email,
            password
        }, { validateStatus: (status) => status === 200 || status === 204 })
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
export const forgotPassword = async ({email}: {email:string}) => {
    try {
        await axiosInstance.post(`/Auth/ForgotPassword`, {
            email,
        }, { validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
        }
    } catch (error: any) {
        return {
            status: false,
        }
    }
}
export const changePassword = async ({currentPassword, newPassword, token}: {token:string,currentPassword:string, newPassword:string}) => {
    try {
        const response = await axiosInstance.post(`/Auth/ChangePassword`, {
            currentPassword,
            newPassword,
        }, { headers :{
            'Authorization': `Bearer ${token}`
        }, validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
        }
    } catch (error: any) {
        return {
            status: false,
        }
    }
}