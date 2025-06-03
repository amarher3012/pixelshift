import { useState, ReactNode } from 'react'

import axios from '../features/axiosConfig'
import { cleanupAuth } from '../features/axiosConfig'
import { AuthContext } from './authUtils'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('accessToken')
    })
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('username')
    })

    const logout = async () => {
        try {
            await axios.post('accounts/logout/')
        } catch {
            // Proceed with cleanup even if logout request fails
        } finally {
            cleanupAuth()
            setIsAuthenticated(false)
            setUsername(null)
            window.location.href = '/login'
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                username,
                setIsAuthenticated,
                setUsername,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
