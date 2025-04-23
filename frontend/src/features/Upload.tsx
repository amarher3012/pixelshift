import axios from 'axios'
import { useForm } from 'react-hook-form'
import './Auth.css'
import { Logout } from './Auth'

type Inputs = {
    name: string
    temp: boolean
    image: FileList
    quality: number
}

export default function Upload() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    axios.defaults.baseURL = 'https://localhost/api/compression/'
    axios.defaults.withCredentials = true

    const onSubmit = (data: Inputs) => {
        const accessToken = localStorage.getItem('accessToken')
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('temp', data.temp.toString())
        formData.append('image', data.image[0])
        formData.append('quality', data.quality.toString())

        axios
            .post('upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
                withCredentials: true,
            })
            .then((response) => console.log(response.data))
            .catch((err) => {
                // TODO: handle expired access token
                if (err.response?.data.code === 'token_not_valid') {
                    axios.post('https://localhost/api/token/refresh/')
                }
            })
    }

    return (
        <div>
            <Logout />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input
                    placeholder="Name"
                    {...register('name', { required: true })}
                    className="border"
                />
                {errors.name && <span>This field is required</span>}

                <label>
                    Temporary?
                    <input
                        type="checkbox"
                        {...register('temp')}
                        className="border"
                    />
                </label>

                <input
                    type="file"
                    {...register('image', { required: true })}
                    className="border"
                />
                {errors.image && <span>Image is required</span>}

                <input
                    placeholder="Quality (1-100)"
                    type="number"
                    {...register('quality', {
                        required: true,
                        min: 1,
                        max: 100,
                    })}
                    className="border"
                />
                {errors.quality && <span>Quality must be between 1–100</span>}

                <input type="submit" className="border" />
            </form>
        </div>
    )
}
