'use client'

import { loginUser } from '@/services'
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const tokenApp = handleGetCookie({key: 'token-app'})
  useLayoutEffect(() => {
    if (tokenApp) {
      setIsAuth(true)
    }
  }, [tokenApp])
  // useEffect(() => {
  //   // Check for existing session in localStorage
  //   const storedUser = localStorage.getItem('user')
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser))
  //   }
  // }, [])

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
    <AuthContext.Provider value={{ login, logout, isAuth }}>
      {children}
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

