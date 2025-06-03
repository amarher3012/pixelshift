import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import axios from '../features/axiosConfig'
import { useAuth } from '../context/authUtils'

interface UserProfile {
    username: string
    email: string
    is_premium: boolean
}

interface UserImage {
    id: number
    name: string
    image: string
    created_at: string
}

export default function Profile() {
    const { t } = useTranslation()
    const { username, isAuthenticated } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [userImages, setUserImages] = useState<UserImage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false)
            return
        }

        // Fetch user profile
        const fetchProfile = axios
            .get('accounts/profile/')
            .then((response) => {
                setProfile(response.data)
                setError('')
            })
            .catch((err) => {
                console.error('Error fetching profile:', err)
                setError('Failed to load profile information')
            })

        // Fetch user's images
        const fetchImages = axios
            .get('compression/user-images/')
            .then((response) => {
                console.log('User images response:', response.data)
                if (Array.isArray(response.data)) {
                    setUserImages(response.data)
                } else {
                    console.error(
                        'Expected array but got:',
                        typeof response.data
                    )
                    setUserImages([])
                }
            })
            .catch((err) => {
                console.error('Error fetching user images:', err)
                setUserImages([])
            })

        Promise.all([fetchProfile, fetchImages]).finally(() => {
            setLoading(false)
        })
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
                <h1 className="text-xl font-bold mb-4">
                    You need to be logged in to view this page
                </h1>
                <Link
                    to="/login"
                    className="px-6 py-3 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors"
                >
                    {t('nav.login')}
                </Link>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-xl">{t('common.loading')}</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 text-center">
                {t('profile.title')}
            </h1>

            {error && (
                <div className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Information Card */}
                <div
                    className={`rounded-xl shadow-lg overflow-hidden ${
                        isMobile
                            ? 'bg-[#2d262f]'
                            : 'bg-[#2d262f]/70 backdrop-blur-md'
                    } p-6`}
                >
                    <h2 className="text-xl font-semibold mb-6 text-white">
                        {t('profile.info')}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm text-gray-400">
                                {t('profile.username')}
                            </h3>
                            <p className="text-white font-medium">{username}</p>
                        </div>
                        {profile && (
                            <>
                                <div>
                                    <h3 className="text-sm text-gray-400">
                                        {t('profile.email')}
                                    </h3>
                                    <p className="text-white font-medium">
                                        {profile.email}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-400">
                                        {t('profile.status')}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        {profile.is_premium ? (
                                            <span className="px-3 py-1 bg-[#aa6ced] text-white text-sm rounded-full">
                                                {t('profile.premium')}
                                            </span>
                                        ) : (
                                            <>
                                                <span className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full">
                                                    {t('profile.free')}
                                                </span>
                                                <button className="ml-2 text-sm text-[#aa6ced] hover:underline">
                                                    {t(
                                                        'profile.upgradeAccount'
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Statistics Card */}
                <div
                    className={`rounded-xl shadow-lg overflow-hidden ${
                        isMobile
                            ? 'bg-[#2d262f]'
                            : 'bg-[#2d262f]/70 backdrop-blur-md'
                    } p-6`}
                >
                    <h2 className="text-xl font-semibold mb-6 text-white">
                        {t('profile.statistics')}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm text-gray-400">
                                {t('profile.uploads')}
                            </h3>
                            <p className="text-3xl font-bold text-white">
                                {userImages.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Uploads Card */}
                <div
                    className={`rounded-xl shadow-lg overflow-hidden ${
                        isMobile
                            ? 'bg-[#2d262f]'
                            : 'bg-[#2d262f]/70 backdrop-blur-md'
                    } p-6`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            {t('profile.recentUploads')}
                        </h2>
                        <Link
                            to="/images"
                            className="text-sm text-[#aa6ced] hover:underline"
                        >
                            {t('profile.viewAll')}
                        </Link>
                    </div>

                    {userImages.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">
                            {t('profile.noUploads')}
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {userImages.slice(0, 4).map((image) => (
                                <Link
                                    key={image.id}
                                    to={`/images/${image.id}`}
                                    className="block overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src={image.image}
                                        alt={image.name}
                                        className="w-full h-24 object-cover"
                                    />
                                    <div className="p-2 bg-black/30 text-xs truncate">
                                        {image.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
