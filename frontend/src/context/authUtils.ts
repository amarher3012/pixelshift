import { createContext, useContext } from 'react'

export interface AuthContextType {
    isAuthenticated: boolean
    username: string | null
    setIsAuthenticated: (value: boolean) => void
    setUsername: (username: string | null) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    username: null,
    setIsAuthenticated: () => {},
    setUsername: () => {},
    logout: () => {},
})

export const useAuth = () => useContext(AuthContext)
