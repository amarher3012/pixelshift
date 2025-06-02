import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './pages/Home'
import ImageDetail from './pages/ImageDetail'
import ImageHub from './pages/ImageGallery'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import { Register, Login } from './features/Auth'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/images" element={<ImageHub />} />
                        <Route path="/images/:id" element={<ImageDetail />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
