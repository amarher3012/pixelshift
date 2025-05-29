import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './pages/Home'
import ImageDetail from './pages/ImageDetail'
import ImageHub from './pages/ImageGallery'
import { AuthProvider } from './context/AuthContext'
import { Register, Login } from './features/Auth'
import './index.css'

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
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
