import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'

import './index.css'
import Home from './pages/Home'
import { Register, Login } from './features/Auth'
import ImageDetail from './pages/ImageDetail'
import Layout from './components/Layout'
import ImageHub from './pages/ImageHub'

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/images" element={<ImageHub />} />
                        <Route path="/images/:id" element={<ImageDetail />} />
                        {/* /upload will later become Home*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
