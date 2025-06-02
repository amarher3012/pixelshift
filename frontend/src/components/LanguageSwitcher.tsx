import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('language', lng)
    }

    return (
        <div className="flex">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded ${
                    i18n.language === 'en'
                        ? 'bg-[#aa6ced] text-white'
                        : 'bg-black/25 text-white'
                } cursor-pointer`}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('es')}
                className={`px-2 py-1 rounded ${
                    i18n.language === 'es'
                        ? 'bg-[#aa6ced] text-white'
                        : 'bg-black/25 text-white'
                } cursor-pointer`}
            >
                ES
            </button>
        </div>
    )
}
