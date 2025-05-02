import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('userToken', token)
    } else {
      localStorage.removeItem('userToken')
    }
  }, [token])
  
  const logout = () => {
    localStorage.removeItem('userToken')
    setToken(null)
  }
  
  const value = {
    token,
    setToken,
    isLoading,
    setIsLoading,
    isAuthenticated: !!token,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}