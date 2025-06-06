import { Link, NavLink } from 'react-router'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../context/authUtils'
import Upload from '../features/Upload'
import { MenuIcon } from '../assets/icons'
import LanguageSwitcher from './LanguageSwitcher'
import logo from '../assets/pixelshift.png'

export default function Navbar() {
    const { t } = useTranslation()
    const { isAuthenticated, logout } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const uploadRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    const activeClasses =
        'text-[#aa6ced] relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-[#aa6ced]'
    const normalClasses =
        'text-white hover:text-[#aa6ced] transition-colors duration-200'

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
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleMobileMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 ${
                isMobile ? 'bg-[#2d262f]' : 'bg-black/25 backdrop-blur-sm'
            } p-4 z-50`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                <div className="flex items-center gap-4 w-1/4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold text-white hover:text-[#aa6ced]"
                    >
                        <img
                            src={logo}
                            alt="PixelShift Logo"
                            className="-mr-3 w-12 h-12"
                        />
                        <span>PixelShift</span>
                    </Link>
                </div>

                {/* Simplified responsive desktop navbar */}
                <div className="hidden md:flex gap-8 lg:gap-12 md:mx-auto lg:mx-0 md:justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeClasses : normalClasses
                        }
                    >
                        {t('nav.home')}
                    </NavLink>
                    <NavLink
                        to="/images"
                        className={({ isActive }) =>
                            isActive ? activeClasses : normalClasses
                        }
                    >
                        {t('nav.gallery')}
                    </NavLink>
                    <span
                        className="text-gray-500 cursor-not-allowed relative group"
                        title="Coming soon"
                    >
                        {t('nav.search')}
                        <span className="absolute -top-2.5 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center rotate-12">
                            {t('nav.searchAI')}
                        </span>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Coming soon
                        </span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-4 min-w-[180px] justify-end">
                    {isAuthenticated && (
                        <div className="relative" ref={uploadRef}>
                            <button
                                onClick={() => setIsUploadOpen(!isUploadOpen)}
                                className="px-4 py-2 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors cursor-pointer"
                            >
                                {t('nav.upload')}
                            </button>
                            {isUploadOpen && (
                                <div className="absolute right-0 mt-2 w-[500px] bg-black/50 backdrop-blur-sm rounded-lg shadow-lg p-4 dropdown-enter">
                                    <Upload />
                                </div>
                            )}
                        </div>
                    )}

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="w-11 h-11 rounded-full bg-[#aa6ced] text-white flex items-center justify-center hover:bg-[#915ace] transition-colors cursor-pointer"
                                >
                                    <span className="text-sm">
                                        {localStorage
                                            .getItem('username')?.[0]
                                            ?.toUpperCase() || 'U'}
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50 dropdown-enter">
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
                                            {t('nav.profile')}
                                        </Link>
                                        <span
                                            className="block px-4 py-2 text-gray-500 cursor-not-allowed"
                                            title="Coming soon"
                                        >
                                            {t('nav.settings')}
                                        </span>
                                        <button
                                            onClick={() => {
                                                logout()
                                                setIsDropdownOpen(false)
                                            }}
                                            className="w-full text-left px-4 py-2 text-white hover:bg-[#aa6ced]/20 cursor-pointer"
                                        >
                                            {t('nav.logout')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="h-10 px-4 flex items-center bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors whitespace-nowrap"
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                to="/register"
                                className="h-10 px-4 flex items-center bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors whitespace-nowrap"
                            >
                                {t('nav.register')}
                            </Link>
                        </div>
                    )}
                    <LanguageSwitcher />
                </div>

                {/* Mobile Navbar */}
                <div ref={mobileMenuRef} className="md:hidden relative">
                    <button
                        onClick={handleMobileMenuToggle}
                        className="flex items-center"
                    >
                        <MenuIcon isOpen={isMobileMenuOpen} />
                    </button>

                    <div
                        className={`${
                            isMobileMenuOpen ? 'block' : 'hidden'
                        } absolute right-0 w-screen mt-3 -mr-4`}
                    >
                        <div className="flex flex-col bg-[#2d262f] rounded-b-xl p-4 mt-2">
                            <div className="flex flex-col border-neutral-700 pt-4 border-b pb-2 -mt-5">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? 'text-[#aa6ced]'
                                                : 'text-white'
                                        } py-2`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.home')}
                                </NavLink>
                                <NavLink
                                    to="/images"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? 'text-[#aa6ced]'
                                                : 'text-white'
                                        } py-2`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.gallery')}
                                </NavLink>
                                <span className="text-gray-500 py-2 cursor-not-allowed relative">
                                    {t('nav.search')} (Coming soon)
                                    <span className="absolute -top-0.5 left-37 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center rotate-12">
                                        {t('nav.searchAI')}
                                    </span>
                                </span>
                            </div>

                            <div className="py-2 border-neutral-700">
                                <LanguageSwitcher />
                            </div>

                            {isAuthenticated ? (
                                <div className="border-t border-neutral-700 pt-4">
                                    <div className="flex items-center gap-3 px-2 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-[#aa6ced] text-white flex items-center justify-center">
                                            <span className="text-sm">
                                                {localStorage
                                                    .getItem('username')?.[0]
                                                    ?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-white">
                                            {localStorage.getItem('username')}
                                        </span>
                                    </div>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `${
                                                isActive
                                                    ? 'text-[#aa6ced]'
                                                    : 'text-white'
                                            } block py-2`
                                        }
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {t('nav.profile')}
                                    </NavLink>
                                    <span className="block py-2 text-gray-500 cursor-not-allowed">
                                        {t('nav.settings')} (Coming soon)
                                    </span>
                                    <button
                                        onClick={() => {
                                            logout()
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className="w-full text-left text-white py-2 hover:text-[#aa6ced]"
                                    >
                                        {t('nav.logout')}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-700">
                                    <Link
                                        to="/login"
                                        className="h-10 px-4 flex items-center justify-center bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors whitespace-nowrap"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="h-10 px-4 flex items-center justify-center bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors whitespace-nowrap"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
