import axios from './axiosConfig'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../types/errors'

// Type
type Inputs = {
    username: string
    password: string
    password2: string
}

const errorTypes = {
    isAuthenticated: 'User is already logged in.',
    tokenExpired: 'Token has expired',
}

// Forms
export function Register() {
    // BUG: fix error handling (user register - 400 (user is logged in.))
    // TODO: redirect to actual site instead of previous
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post('accounts/register/', {
                username: data.username,
                password: data.password,
            })
            .then((_response) => {
                console.log('Registered successfully')
                return axios.post('login/', {
                    username: data.username,
                    password: data.password,
                    password2: data.password2,
                })
            })
            .then((res) => {
                const accessToken = res.data.access
                localStorage.setItem('accessToken', accessToken)
                navigate('/login')
            })
            .catch((err) => {
                if (err.response?.data?.detail === errorTypes.isAuthenticated) {
                    // TODO: show the user they are already logged in then send them to home
                    // Maybe using axios interceptor
                    navigate('/upload')
                }
            })
    }

    return (
        <div>
            <h1>Register form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                <input
                    placeholder="Repeat your password"
                    type="password"
                    {...register('password2', { required: true })}
                />
                {errors.password && errors.password2 && (
                    <span>This field is required</span>
                )}
                <input type="submit" className="border" />
            </form>
        </div>
    )
}

export function Login() {
    const { setIsAuthenticated } = useAuth()
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

        try {
            await axios.post('accounts/logout/')
        } catch (err) {
            const error = err as ApiError
            if (error.response?.data?.detail !== errorTypes.tokenExpired) {
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }

        // Clear any leftover tokens
        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']

        // Now try to login
        axios
            .post('accounts/login/', {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                const accessToken = response.data.access
                localStorage.setItem('accessToken', accessToken)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`
                setIsAuthenticated(true)
                navigate('/upload')
            })
            .catch((err) => {
                if (err.response?.status === 400) {
                    setLoginError(err.response.data.detail || 'Login failed')
                }
            })
    }

    const handleGuestUpload = () => {
        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']
        navigate('/upload')
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
                        className="border bg-neutral-700 text-white p-2 rounded-lg hover:bg-neutral-600"
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
