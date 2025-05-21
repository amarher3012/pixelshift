export interface ApiError {
    response?: {
        status: number
        statusText: string
        data: {
            detail?: string
            message?: string
            errors?: Record<string, string[]>
        }
    }
    message: string
    code: string
}
