import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className="min-h-screen w-screen bg-[url('../assets/background.svg')] bg-fixed bg-no-repeat bg-cover bg-center">
            <Navbar />
            <main className="flex-1 min-h-screen pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
