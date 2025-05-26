import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
    return (
        <div className="w-screen h-screen bg-[url('../assets/background.svg')] bg-fixed bg-no-repeat bg-cover bg-center">
            <Navbar />
            <main className="pt-16">
                <Outlet />
            </main>
        </div>
    )
}
