import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-black/25 backdrop-blur-sm py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between gap-8">
                    <div className="flex gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                PixelShift
                            </h3>
                            <p className="text-white/60 max-w-1/2">
                                Your trusted platform for image storage and
                                compression.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                Links
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-white/60 hover:text-white"
                                    >
                                        {t('nav.home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/images"
                                        className="text-white/60 hover:text-white"
                                    >
                                        {t('nav.gallery')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/search"
                                        className="text-white/60 hover:text-white"
                                    >
                                        {t('nav.search')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Contact Information
                        </h4>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
                    <p>
                        &copy; {new Date().getFullYear()} PixelShift. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
