'use client'

import Loading from '@/components/Loading'
import { getEvents, loginUser } from '@/services'
import { handleDeleteCookie, handleGetCookie, handleSetCookie } from '@/utils/helpers'
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react'

type User = {
  id: number
  name: string
  email: string
}

type AuthContextType = {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuth: boolean
  eventList: EventItem[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [eventList, setEventList] = useState<EventItem[] | []>([])
  const tokenApp = handleGetCookie({key: 'token-app'})
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    if (tokenApp) {
      setIsAuth(true)
    }
  }, [tokenApp])

  useEffect(() => {
    (async () => {
      const {data} = await getEvents({displayStatus: 'show', groupType: 'internal', source: process.env.NEXT_PUBLIC_SOURCE as string})
      setEventList(data)
      setIsLoading(false)
    })()
  }, [])
  
  const login = async (email: string, password: string): Promise<boolean> => {
    const {data, status} = await loginUser({email, password})
    if (status) {
      handleSetCookie({key: 'token-app', value: data?.token ?? ''})
    }
    return status
  }

  const logout = () => {
    setIsAuth(false)
    handleDeleteCookie({key: 'token-app'})
  } 

  return (
    <AuthContext.Provider value={{ login, logout, isAuth , eventList}}>
      {children}
      {isLoading && <Loading />}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

