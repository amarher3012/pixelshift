import { useTranslation } from 'react-i18next'

export default function Info() {
    const { t } = useTranslation()

    return (
        <div className="relative h-auto mt-50">
            <div className="absolute w-full h-[150px] bg-[#2e1b36] transform -skew-y-3 origin-left"></div>
            <div className="relative w-full min-h-[400px] bg-[#2e1b36] mt-[100px] px-4 py-20">
                <div className="lg:w-2/4 sm:w-3/4 mx-auto relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            {t('info.first.title')}
                        </h2>
                        <p className="text-white/80">
                            {t('info.first.description')}
                        </p>
                    </div>
                    <img
                        src="static/images/info1"
                        alt={t('info.first.title')}
                        className="w-full max-w-[300px] h-[200px] object-cover rounded-lg mx-auto order-1 md:order-2"
                    />
                </div>
            </div>
            <div className="w-full min-h-[400px] bg-[#23182c] px-4 py-20">
                <div className="lg:w-2/4 sm:w-3/4 mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <img
                        src="static/images/info2"
                        alt={t('info.second.title')}
                        className="w-full max-w-[300px] h-[200px] object-cover rounded-lg mx-auto order-1"
                    />
                    <div className="text-center md:text-right order-2">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            {t('info.second.title')}
                        </h2>
                        <p className="text-white/80">
                            {t('info.second.description')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-[400px] bg-[#2e1b36] px-4 py-20">
                <div className="lg:w-2/4 sm:w-3/4 mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            {t('info.third.title')}
                        </h2>
                        <p className="text-white/80">
                            {t('info.third.description')}
                        </p>
                    </div>
                    <img
                        src="static/images/info3"
                        alt={t('info.third.title')}
                        className="w-full max-w-[300px] h-[200px] object-cover rounded-lg mx-auto order-1 md:order-2"
                    />
                </div>
            </div>
        </div>
    )
}
