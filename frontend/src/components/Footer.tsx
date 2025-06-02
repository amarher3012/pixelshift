import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

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
            } py-8`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:max-w-xs">
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
                                    <Link
                                        to="/search"
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {t('nav.search')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="md:min-w-[200px]">
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="inline"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                                    </svg>
                                    {t('footer.github')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:amarher3012@g.educaand.es"
                                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="inline"
                                    >
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                    </svg>
                                    {t('footer.email')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
                    <p>
                        &copy; {new Date().getFullYear()} PixelShift. {t('footer.allRightsReserved')}
                    </p>
                </div>
            </div>
        </footer>
    )
}
