
import axios from 'axios'
import axiosInstance from './base'
import { uuidv4 } from '@/utils/helpers'
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
        await axiosInstance.post(`/Auth/ChangePassword`, {
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

export const getEvents = async ({displayStatus, groupType, source}: {source:string, displayStatus:string, groupType:string}) => {
    try {
        const response = await axiosInstance.get(`/Main/GetEvents`, { params: {
            displayStatus,
            groupType,
            source
        } , validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data,
        }
    } catch (error: any) {
        return {
            status: false,
            data: []
        }
    }
}
export const getEventDetail = async ({code, source}: {source:string, code:string}) => {
    try {
        const response = await axiosInstance.get(`/Main/GetEventDetail`, { params: {
            code,
            source
        } , validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data,
        }
    } catch (error: any) {
        return {
            status: false,
            data: null
        }
    }
}
export const getPhotos = async ({ page, eventCode, query, face, token }: {token?:string, face?:string, query?:string, page?: number; eventCode: string }) => {
    try {
        const response = await axiosInstance.get('/Main/GetPhotos', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                eventCode: eventCode,
                currentPage: page,
                query: query,
                pageSize: 24,
                sort: true,
                face: face
            },
            validateStatus: (status) => status === 200 || status === 204
        })
        return {
            status: true,
            data: response.data,
            message: response.statusText
        }
    } catch (error: any) {
        return {
            status: false,
            data: null,
            message: error?.message ?? 'Error while getting photos'
        }
    }
}

export const uploadFile = async ({base64, token, name, userId}: {userId: string, name:string, token:string, base64:string}) => {
    try {
        const response = await axios.post('https://z7fqm2zcr6.execute-api.us-west-2.amazonaws.com/prod/uploadsearch',
        {
            image: base64,
            filename: name,
            userid: userId
        }, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return {
            status: true,
            data: response.data,
            message: 'uploading file success'
        }
    } catch (error) {
        return {
            status: false,
            data: null,
            message: 'uploading file error'
        }
    }
}

export const getUserFaces = async ({token}: {token:string}) => {
    try {
        const response = await axiosInstance.get(`/Main/GetUserFaces`, {
            headers :{
            'Authorization': `Bearer ${token}`
        }, validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            status: false,
            data: []
        }
    }
}
export const getUserTransactions = async ({token}: { token:string}) => {
    try {
        const response = await axiosInstance.get(`/Main/GetUserTransactions`, {
            headers :{
            'Authorization': `Bearer ${token}`
        }, validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            status: false,
            data: []
        }
    }
}
export const postInitTransaction = async ({token, eventCode, query, face, items, type}: {items?: string[], type?: 'ITEM' | 'LINK', query?:string, face?:string, eventCode?:string, token:string}) => {
    try {
        const response = await axiosInstance.post(`/Main/InitTransaction`,{
            eventCode,
            query,
            face,
            items,
            type
        }, {
            headers :{
            'Authorization': `Bearer ${token}`
        }, validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            status: false,
            data: null
        }
    }
}
export const postRemoveFace = async ({token, faceId}: {faceId:string, token:string}) => {
    try {
        const response = await axiosInstance.post(`/Main/RemoveFace`,{
            faceId
        }, {
            headers :{
            'Authorization': `Bearer ${token}`
        }, validateStatus: (status) => status === 200 || status === 204 })
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            status: false,
            data: null
        }
    }
}