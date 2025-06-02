import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import Upload from '../features/Upload'
import Info from '../components/Info'
import '../assets/tailwind.css'

export default function Home() {
    const { t } = useTranslation()
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center gap-5 lg:w-1/2 sm:w-3/4 mx-auto p-4 min-h-[calc(100vh-16rem)]">
                <div className="flex flex-col justify-center gap-5 p-4 rounded-2xl">
                    <h1 className="text-center text-6xl text-shadow-neutral-800 text-shadow-lg">
                        PixelShift
                    </h1>
                    <p className="text-shadow-neutral-800 text-shadow-lg">
                        {t('home.description')}
                    </p>
                </div>
                <div>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsUploadOpen(!isUploadOpen)}
                            className={`p-3 text-white ${
                                isMobile
                                    ? 'bg-[#2d262f]'
                                    : 'bg-black/25 backdrop-blur-sm'
                            } rounded-lg hover:bg-black/60 transition-colors cursor-pointer`}
                        >
                            {t('home.upload')}
                        </button>
                        <span className="self-center">{t('home.or')}</span>
                        <button
                            className={`p-3 text-white ${
                                isMobile
                                    ? 'bg-[#2d262f]'
                                    : 'bg-black/25 backdrop-blur-sm'
                            } rounded-lg hover:bg-black/60 transition-colors`}
                        >
                            <Link to="/images">{t('home.search')}</Link>
                        </button>
                    </div>
                    <div
                        className={`w-full mt-2 transition-all duration-300 ease-in overflow-hidden ${
                            isUploadOpen
                                ? 'max-h-[500px] opacity-100 scale-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div
                            className={`${
                                isMobile
                                    ? 'bg-[#2d262f]'
                                    : 'bg-black/25 backdrop-blur-sm'
                            } rounded-lg shadow-lg p-4`}
                        >
                            <Upload />
                        </div>
                    </div>
                </div>
            </div>

            <Info />
        </>
    )
}
