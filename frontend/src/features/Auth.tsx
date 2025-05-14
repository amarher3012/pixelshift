import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'

// Type
type Inputs = {
    username: string
    password: string
    password2: string
}

const errorTypes = {
    isAuthenticated: 'User is already logged in.',
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
        axios.defaults.baseURL = 'https://localhost/api/accounts/'
        axios.defaults.withCredentials = true

        axios
            .post('register/', {
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.defaults.baseURL = 'https://localhost/api/accounts/'
        axios.defaults.withCredentials = true

        axios
            .post('login/', {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                const accessToken = response.data.access
                localStorage.setItem('accessToken', accessToken)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`
                navigate('/upload')
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    const errData = err.response.data
                    console.log(errData)
                }
            })
    }

    return (
        <div>
            <h1>Login form</h1>
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
                {errors.password && <span>This field is required</span>}
                <input type="submit" className="border" />
            </form>
        </div>
    )
}

export function Logout() {
    const { handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = () => {
        axios.defaults.baseURL = 'https://localhost/api/accounts/'
        axios.defaults.withCredentials = true

        axios
            .post(
                'https://localhost/api/accounts/logout/',
                {},
                { withCredentials: true }
            )
            .then(() => {
                delete axios.defaults.headers.common['Authorization']
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
