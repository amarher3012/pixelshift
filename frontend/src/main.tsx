import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'
import Home from './pages/Home'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    </BrowserRouter>
)
