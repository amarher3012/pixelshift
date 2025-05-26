import { createContext, useContext, useState, ReactNode } from 'react'
import axios from '../features/axiosConfig'
import { cleanupAuth } from '../features/axiosConfig'

interface AuthContextType {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('accessToken')
    })

    const logout = async () => {
        try {
            await axios.post('accounts/logout/')
        } catch {
            // Proceed with cleanup even if logout request fails
        } finally {
            cleanupAuth()
            setIsAuthenticated(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
