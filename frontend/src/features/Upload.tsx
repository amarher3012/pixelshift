import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import axios from './axiosConfig'
import { useAuth } from '../context/authUtils'

type Inputs = {
    name: string
    temp: boolean
    image: FileList
    quality: number
    is_public: boolean
    description: string
}

export default function Upload() {
    const { t } = useTranslation()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const [error, setError] = useState<string>('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const onSubmit = (data: Inputs) => {
        setIsUploading(true)
        const accessToken = localStorage.getItem('accessToken')
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('temp', (!data.temp).toString())
        formData.append('image', data.image[0])
        formData.append('quality', data.quality.toString())
        formData.append('description', data.description)
        formData.append(
            'is_public',
            isAuthenticated ? data.is_public.toString() : 'true'
        )

        setError('')
        setIsRefreshing(false)

        axios
            .post('compression/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            })
            .then((response) => {
                setError('')
                navigate(`/images/${response.data.id}`)
            })
            .catch((err) => {
                if (err.response?.data?.error) {
                    if (
                        err.response.data.error.includes(
                            'Guests can only upload'
                        )
                    ) {
                        setError(t('upload.errors.guestLimit'))
                    } else if (
                        err.response.data.error.includes(
                            'Free users can only upload'
                        )
                    ) {
                        setError(t('upload.errors.freeLimit'))
                    } else {
                        setError(err.response.data.error)
                    }
                } else {
                    setError(t('upload.errors.uploadFailed'))
                }
                console.error('Upload error:', err.response?.data)
            })
            .finally(() => {
                setIsUploading(false)
            })
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-bold text-white">
                    {t('upload.title')}
                </h2>
            </div>
            {error && (
                <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
            {isRefreshing && (
                <div className="text-amber-500 mb-4 text-center">
                    {t('upload.refreshing')}
                </div>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-0">
                    <input
                        placeholder={t('upload.name')}
                        {...register('name', { required: true })}
                        className="p-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#aa6ced] shadow-sm transition placeholder:text-neutral-300"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm pl-2">
                            {t('upload.nameRequired')}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-0 bg-none">
                    <textarea
                        placeholder={t('upload.description')}
                        {...register('description')}
                        className="p-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#aa6ced] shadow-sm transition placeholder:text-neutral-300 resize-none h-24"
                    />
                </div>

                <div className="flex flex-col gap-0">
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="p-2 rounded-xl border border-neutral-300 shadow-sm cursor-pointer transition placeholder:text-neutral-300 hover:border-[#aa6ced] focus:ring-[#aa6ced]"
                    />
                    {errors.image && (
                        <span className="text-red-500 text-sm pl-2">
                            Image is required
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-0">
                    <input
                        placeholder={t('upload.quality')}
                        type="number"
                        {...register('quality', {
                            required: true,
                            min: 1,
                            max: 100,
                        })}
                        className="p-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#aa6ced] shadow-sm transition placeholder:text-neutral-300"
                    />
                    {errors.quality && (
                        <span className="text-red-500 text-sm pl-2">
                            {t('upload.qualityError')}
                        </span>
                    )}
                </div>

                {isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <span className="text-sm">
                            {t('upload.savePermanently')}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('temp')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral-800 rounded-full peer-checked:bg-[#aa6ced] transition-colors peer-focus:ring-2 peer-focus:ring-[#aa6ced]"></div>
                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                        </label>
                    </div>
                )}

                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm">
                            {t('upload.makePublic')}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('is_public')}
                                defaultChecked={true}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral-800 rounded-full peer-checked:bg-[#aa6ced] transition-colors peer-focus:ring-2 peer-focus:ring-[#aa6ced]"></div>
                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                        </label>
                    </div>
                ) : null}

                <input
                    type="submit"
                    value={
                        isUploading
                            ? t('upload.uploading')
                            : t('upload.uploadButton')
                    }
                    disabled={isUploading}
                    className="border border-neutral-800 bg-[#aa6ced] text-shadow-xl rounded-lg p-2 text-shadow-neutral-500 text-shadow-lg disabled:opacity-50"
                />
            </form>
        </div>
    )
}
