import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'

// Type
type Inputs = {
    username: string
    password: string
}

// Forms
export function Register() {
    // BUG: fix error handling (user register - 400 (user is logged in.))
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

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
                })
            })
            .then((res) => {
                const accessToken = res.data.access
                localStorage.setItem('accessToken', accessToken)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`
                console.log('Auto-login successful')
            })
            .catch((err) => console.log(err.response?.data))
    }

    return (
        <div>
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
                navigate(-1)
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input type="submit" className="border" />
            </form>
        </div>
    )
}
