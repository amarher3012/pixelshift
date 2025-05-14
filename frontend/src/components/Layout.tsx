import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <div className="w-screen h-screen bg-[url('../assets/background.svg')] bg-fixed bg-no-repeat bg-cover bg-center">
            <Outlet />
        </div>
    )
}
