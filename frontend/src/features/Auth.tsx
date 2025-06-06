import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Auth.css'

import axios, { cleanupAuth } from './axiosConfig'
import { useAuth } from '../context/authUtils'

// Type
type Inputs = {
    username: string
    email: string
    password: string
    password2: string
}

// Forms
export function Register() {
    const { t } = useTranslation()
    const { setIsAuthenticated, setUsername } = useAuth()
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Inputs>()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setError('')
        axios
            .post('accounts/register/', {
                username: data.username,
                email: data.email,
                password: data.password,
                password2: data.password2,
            })
            .then((response) => {
                const accessToken = response.data.access
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('username', data.username)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`
                setIsAuthenticated(true)
                setUsername(data.username)
                setSuccess(true)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            })
            .catch((err) => {
                if (err.response?.data?.detail) {
                    setError(err.response.data.detail)
                } else if (err.response?.data?.password) {
                    setError(err.response.data.password[0])
                } else {
                    setError(t('auth.registerFailed'))
                }
            })
    }

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto p-8">
            <div
                className={`flex flex-wrap justify-center gap-8 p-8 ${
                    isMobile ? 'bg-[#2d262f]' : 'bg-black/25 backdrop-blur-sm'
                } rounded-xl shadow-lg`}
            >
                <div className="flex-1 min-w-[280px] max-w-[400px] flex flex-col gap-6">
                    <h2 className="text-xl font-semibold text-white text-center">
                        {t('auth.joinPixelshift')}
                    </h2>

                    {success ? (
                        <div className="bg-green-500/20 border-l-4 border-green-500 p-3 text-green-500 rounded">
                            {t('auth.redirectingHome')}
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-500/20 border-l-4 border-red-500 p-3 text-red-500 rounded mb-4">
                                    {error}
                                </div>
                            )}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-5"
                            >
                                <div className="relative">
                                    <input
                                        placeholder={t('auth.username')}
                                        {...register('username', {
                                            required: t(
                                                'auth.usernameRequired'
                                            ),
                                        })}
                                        className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                                    />
                                    {errors.username && (
                                        <span className="text-sm text-red-400 mt-1 block">
                                            {errors.username.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder={t('auth.email')}
                                        type="email"
                                        {...register('email', {
                                            required: t('auth.emailRequired'),
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: t('auth.invalidEmail'),
                                            },
                                        })}
                                        className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-400 mt-1 block">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder={t('auth.password')}
                                        type="password"
                                        {...register('password', {
                                            required: t(
                                                'auth.passwordRequired'
                                            ),
                                            minLength: {
                                                value: 8,
                                                message: t(
                                                    'auth.passwordLength'
                                                ),
                                            },
                                        })}
                                        className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                                    />
                                    {errors.password && (
                                        <span className="text-sm text-red-400 mt-1 block">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder={t('auth.confirmPassword')}
                                        type="password"
                                        {...register('password2', {
                                            required: t(
                                                'auth.confirmPasswordRequired'
                                            ),
                                            validate: (value) =>
                                                value === watch('password') ||
                                                t('auth.passwordsDoNotMatch'),
                                        })}
                                        className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                                    />
                                    {errors.password2 && (
                                        <span className="text-sm text-red-400 mt-1 block">
                                            {errors.password2.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="p-3 bg-[#aa6ced] text-white border-none rounded-lg font-semibold cursor-pointer hover:bg-[#915ace] transition w-full"
                                >
                                    {t('auth.registerButton')}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export function Login() {
    const { t } = useTranslation()
    const { setIsAuthenticated, setUsername } = useAuth()
    const [loginError, setLoginError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        setLoginError('')

        axios
            .post('accounts/login/', {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                const accessToken = response.data.access
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('username', data.username)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`
                setIsAuthenticated(true)
                setUsername(data.username)
                navigate('/')
            })
            .catch((err) => {
                setLoginError(
                    err.response?.data?.detail || t('auth.loginError')
                )
                setIsLoading(false)
            })
    }

    const handleGuestUpload = () => {
        cleanupAuth()
        navigate('/')
    }

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto p-8">
            <div
                className={`flex flex-col items-center p-8 ${
                    isMobile ? 'bg-[#2d262f]' : 'bg-black/25 backdrop-blur-sm'
                } rounded-xl shadow-lg`}
            >
                <div className="w-full max-w-[400px] flex flex-col gap-6">
                    <h2 className="text-xl font-semibold text-white text-center">
                        {t('auth.loginToPixelshift')}
                    </h2>

                    {loginError && (
                        <div className="bg-red-500/20 border-l-4 border-red-500 p-3 text-red-500 rounded mb-4">
                            {loginError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
                        <div className="relative">
                            <input
                                placeholder={t('auth.username')}
                                {...register('username', { required: true })}
                                className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                            />
                            {errors.username && (
                                <span className="text-sm text-red-400 mt-1 block">
                                    {t('auth.usernameRequired')}
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                placeholder={t('auth.password')}
                                type="password"
                                {...register('password', { required: true })}
                                className="p-3 rounded-lg bg-[#2d262f] border border-[#503b5e] text-white focus:border-[#aa6ced] focus:shadow-purple-500 focus:shadow-sm transition w-full"
                            />
                            {errors.password && (
                                <span className="text-sm text-red-400 mt-1 block">
                                    {t('auth.passwordRequired')}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="p-3 bg-[#aa6ced] text-white border-none rounded-lg font-semibold cursor-pointer hover:bg-[#915ace] transition w-full disabled:bg-[#734d95] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? t('auth.loggingIn')
                                : t('auth.loginButton')}
                        </button>
                    </form>
                </div>

                <div className="w-full max-w-[400px] flex items-center relative my-6 before:content-[''] before:h-px before:bg-[#503b5e] before:flex-grow after:content-[''] after:h-px after:bg-[#503b5e] after:flex-grow">
                    <span className="px-4 text-gray-500 text-sm">
                        {t('auth.or')}
                    </span>
                </div>

                <div className="w-full max-w-[400px] flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-white text-center mb-4">
                        {t('auth.continueAsGuest')}
                    </h2>
                    <button
                        onClick={handleGuestUpload}
                        className="p-3 bg-[#aa6ced] text-white border-none rounded-lg font-semibold cursor-pointer hover:bg-[#915ace] transition w-full"
                    >
                        {t('auth.uploadWithoutAccount')}
                    </button>
                    <p className="mt-3 text-sm text-gray-400 text-center">
                        {t('auth.tempFilesNote')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function Logout() {
    const { setIsAuthenticated } = useAuth()
    const { handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = () => {
        axios
            .post('accounts/logout/', {})
            .then(() => {
                delete axios.defaults.headers.common['Authorization']
                localStorage.removeItem('accessToken')
                setIsAuthenticated(false)
                navigate('/login/')
            })
            .catch((err) => {
                if (err.response?.status === 400) {
                    console.log(err.response.data)
                }
            })
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <input type="submit" className="border" />
            </form>
        </div>
    )
}
