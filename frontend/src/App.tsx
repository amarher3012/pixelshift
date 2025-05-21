import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'

import './index.css'
import Home from './pages/Home'
import { Register, Login } from './features/Auth'
import Upload from './features/Upload'
import Layout from './components/Layout'

export default function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}
