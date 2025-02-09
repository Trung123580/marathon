
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
// export const callApiImage = async ({ page, eventCode }: { page: number; eventCode: string }) => {
//   try {
//     const response = await axios.get(`${BASE_API}/web/GetPhotosByEventCode`, {
//       params: {
//         // eventCode: EVENT_CODE,
//         eventCode: eventCode,
//         partnerCode: PARTNER_CODE,
//         currentPage: page,
//         pageSize: 60,
//         sort: true,
//       },
//     })
//     if (response.status === 200) {
//       return response.data
//     } else {
//       throw new Error("Data not found")
//     }
//   } catch (error) {
//     return []
//   }
// }
export const getPhotosByEventCode = async ({ page, eventCode, query }: {query?:string, page?: number; eventCode: string }) => {
    try {
        const response = await axiosInstance.get('/Main/GetPhotosByEventCode', {
            params: {
                eventCode: eventCode,
                currentPage: page,
                query: query,
                pageSize: 24,
                sort: true
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