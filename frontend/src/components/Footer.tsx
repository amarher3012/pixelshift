import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import { GithubIcon, EmailIcon } from '../assets/icons'

export default function Footer() {
    const { t } = useTranslation()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <footer
            className={`${
                isMobile ? 'bg-[#2d262f]' : 'bg-black/25 backdrop-blur-sm'
            } py-8 shadow-2xl`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:max-w-xs">
                            <h3 className="text-xl font-bold text-white mb-4">
                                PixelShift
                            </h3>
                            <p className="text-white/60">
                                {t('footer.yourTrustedPlatform')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                {t('footer.links')}
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {t('nav.home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/images"
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {t('nav.gallery')}
                                    </Link>
                                </li>
                                <li>
                                    <span className="text-white/40 cursor-not-allowed relative inline-block">
                                        {t('nav.search')} (Coming soon)
                                        <span className="absolute -top-2.5 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center rotate-12">
                                            {t('nav.searchAI')}
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:min-w-[200px]">
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {t('footer.contactInfo')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/amarher3012/pixelshift"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <GithubIcon />
                                    {t('footer.github')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:amarher3012@g.educaand.es"
                                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <EmailIcon />
                                    {t('footer.email')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
                    <p>
                        &copy; {new Date().getFullYear()} PixelShift.{' '}
                        {t('footer.allRightsReserved')}
                    </p>
                </div>
            </div>
        </footer>
    )
}
