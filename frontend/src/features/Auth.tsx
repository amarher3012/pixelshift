import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useState } from 'react'

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
    const { setIsAuthenticated, setUsername } = useAuth()
    const [success, setSuccess] = useState<boolean>(false)
    const [_error, setError] = useState<string>('')
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Inputs>()

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
                    setError('Registration failed. Please try again.')
                }
            })
    }

    return (
        <div>
            <h1>Register form</h1>
            {success ? (
                <div className="text-green-500 mb-4">
                    Registration successful! Redirecting to login...
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                >
                    <input
                        placeholder="Username"
                        {...register('username', {
                            required: 'Username is required',
                        })}
                        className="border"
                    />
                    {errors.username && <span>{errors.username.message}</span>}

                    <input
                        placeholder="Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        className="border"
                    />
                    {errors.email && <span>{errors.email.message}</span>}

                    <input
                        placeholder="Password"
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must be at least 8 characters',
                            },
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}

                    <input
                        placeholder="Confirm Password"
                        type="password"
                        {...register('password2', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === watch('password') ||
                                'The passwords do not match',
                        })}
                    />
                    {errors.password2 && (
                        <span>{errors.password2.message}</span>
                    )}

                    <input type="submit" className="border" />
                </form>
            )}
        </div>
    )
}

export function Login() {
    const { setIsAuthenticated, setUsername } = useAuth()
    const [loginError, setLoginError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

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
                    err.response?.data?.detail ||
                        'An error occurred during login'
                )
                setIsLoading(false)
            })
    }

    const handleGuestUpload = () => {
        cleanupAuth()
        navigate('/')
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            <h1 className="text-2xl">Welcome to PixelShift</h1>

            <div className="flex gap-4 items-center">
                <div className="flex flex-col">
                    <h2 className="text-xl mb-4">Login</h2>
                    {loginError && (
                        <div className="text-red-500 mb-4">{loginError}</div>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3"
                    >
                        <input
                            placeholder="Username"
                            {...register('username', { required: true })}
                            className="border"
                        />
                        {errors.username && <span>This field is required</span>}

                        <input
                            placeholder="Password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span>This field is required</span>}
                        <input
                            type="submit"
                            value={isLoading ? 'Logging in...' : 'Login'}
                            disabled={isLoading}
                            className="border bg-[#aa6ced] text-white p-2 rounded-lg disabled:opacity-50"
                        />
                    </form>
                </div>

                <div className="flex items-center">
                    <span className="px-4 text-neutral-500">or</span>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl mb-4">Continue as Guest</h2>
                    <button
                        onClick={handleGuestUpload}
                        className="px-4 py-2 bg-[#aa6ced] text-white rounded-lg hover:bg-[#915ace] transition-colors cursor-pointer"
                    >
                        Upload without account
                    </button>
                    <p className="text-sm text-neutral-500 mt-2">
                        Note: Files will be temporary
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
        // Only testing this.
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
