import { BrowserRouter, Routes, Route } from 'react-router'
import { createContext, useContext, useState } from 'react'

import './index.css'
import Home from './pages/Home'
import { Register, Login } from './features/Auth'
import Upload from './features/Upload'
import Layout from './components/Layout'

export default function App() {
    const AuthContext = createContext('isAuthenticated')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // TODO: create global isAuthenticated variable with a fetch to the backend

    return (
        <AuthContext.Provider value="false">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/upload" element={<Upload />} />
                        {/* /upload will later become Home*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}
