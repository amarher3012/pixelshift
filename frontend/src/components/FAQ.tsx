import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FAQ() {
    const { t } = useTranslation()
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isMobile] = useState(window.innerWidth < 768)

    const questions = t('home.faq.questions', {
        returnObjects: true,
    }) as Array<{
        question: string
        answer: string
    }>

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-6">
                {t('home.faq.title')}
            </h2>
            <div className="space-y-4">
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                            isMobile
                                ? 'bg-[#2d262f]'
                                : 'bg-black/25 backdrop-blur-sm'
                        } rounded-lg overflow-hidden`}
                    >
                        <button
                            className="w-full p-4 text-left flex justify-between items-center text-white hover:text-[#aa6ced] transition-colors cursor-pointer"
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        >
                            <span className="font-medium">{item.question}</span>
                            <span className="ml-4">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                openIndex === index ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
                            <p className="p-4 pt-0 text-neutral-400">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
