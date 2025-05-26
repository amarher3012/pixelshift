import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import Upload from '../features/Upload'

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const uploadRef = useRef<HTMLDivElement>(null)

    // Handle click outside of dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
            if (
                uploadRef.current &&
                !uploadRef.current.contains(event.target as Node)
            ) {
                setIsUploadOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/25 backdrop-blur-sm p-4 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-white hover:text-[#aa6ced]"
                    >
                        PixelShift
                    </Link>
                    <Link
                        to="/images"
                        className="text-white hover:text-[#aa6ced]"
                    >
                        Images
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative" ref={uploadRef}>
                        <button
                            onClick={() => setIsUploadOpen(!isUploadOpen)}
                            className="px-4 py-2 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors"
                        >
                            Upload
                        </button>
                        {isUploadOpen && (
                            <div className="absolute right-0 mt-2 w-[500px] bg-black/50 backdrop-blur-sm rounded-lg shadow-lg p-4">
                                <Upload />
                            </div>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="w-11 h-11 rounded-full bg-[#aa6ced] text-white flex items-center justify-center hover:bg-[#915ace] transition-colors"
                                >
                                    <span className="text-sm">
                                        {localStorage
                                            .getItem('username')?.[0]
                                            ?.toUpperCase() || 'U'}
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50">
                                        <div className="px-4 py-2 border-b border-neutral-700">
                                            <p className="text-white font-semibold">
                                                {localStorage.getItem(
                                                    'username'
                                                )}
                                            </p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-white hover:bg-[#aa6ced]/20"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-white hover:bg-[#aa6ced]/20"
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout()
                                                setIsDropdownOpen(false)
                                            }}
                                            className="w-full text-left px-4 py-2 text-white hover:bg-[#aa6ced]/20"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
