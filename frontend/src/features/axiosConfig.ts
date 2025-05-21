import axios from 'axios'

axios.defaults.baseURL = 'https://api.axmh.tech/'
axios.defaults.withCredentials = true

const token = localStorage.getItem('accessToken')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const response = await axios.post('accounts/refresh/')
                const newToken = response.data.access
                localStorage.setItem('accessToken', newToken)
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${newToken}`
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`

                return axios(originalRequest)
            } catch (refreshError) {
                localStorage.clear()
                delete axios.defaults.headers.common['Authorization']

                try {
                    await axios.post('accounts/logout/')
                } catch {
                    // Ignore logout errors
                } finally {
                    window.location.href = '/login'
                }
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axios
