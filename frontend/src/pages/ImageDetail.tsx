import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router'

import axios from '../features/axiosConfig'
import { ApiError } from '../types/errors'
import { useAuth } from '../context/authUtils'
import { TrashIcon } from '../assets/icons'

interface ImageDetail {
    id: number
    name: string
    image: string
    quality: number
    created_at: string
    creator: string
    description: string | null
    user_details?: {
        username: string
        email: string
        is_premium: boolean
    }
}

export default function ImageDetail() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const [image, setImage] = useState<ImageDetail | null>(null)
    const [groupImages, setGroupImages] = useState<ImageDetail[]>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        axios
            .get(`compression/images/${id}/`)
            .then((response) => {
                setImage(response.data)
                setEditedName(response.data.name)
                setEditedDescription(response.data.description || '')
                setError('')
            })
            .catch((err: ApiError) => {
                setError(err.response?.data?.detail || 'Failed to load image')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [id])

    useEffect(() => {
        const groupParam = searchParams.get('group')
        if (groupParam) {
            const ids = groupParam.split(',')
            Promise.all(
                ids.map((imgId) =>
                    axios
                        .get(`compression/images/${imgId}/`)
                        .then((response) => response.data)
                        .catch(() => null)
                )
            ).then((results) => {
                setGroupImages(results.filter(Boolean))
            })
        }
    }, [searchParams])

    const handleEdit = async () => {
        try {
            await axios.patch(`compression/images/${id}/`, {
                name: editedName,
                description: editedDescription,
            })
            setImage((prev) =>
                prev
                    ? {
                          ...prev,
                          name: editedName,
                          description: editedDescription,
                      }
                    : null
            )
            setIsEditing(false)
            setError('')
        } catch (err: unknown) {
            setError(
                (err as ApiError).response?.data?.detail ||
                    'Failed to update image'
            )
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this image?'))
            return

        try {
            await axios.delete(`compression/images/${id}/`)
            navigate('/images')
        } catch (err: unknown) {
            setError(
                (err as ApiError).response?.data?.detail ||
                    'Failed to delete image'
            )
        }
    }

    const isOwner = () => {
        if (!image) return false
        if (isAuthenticated) {
            return (
                image.user_details?.username ===
                localStorage.getItem('username')
            )
        } else {
            const guestId = document.cookie
                .split('; ')
                .find((row) => row.startsWith('guest_id='))
                ?.split('=')[1]
            return image.creator === `Guest-${guestId?.slice(0, 8)}`
        }
    }

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>
    }

    if (!image) {
        return <div className="text-center">Image not found</div>
    }

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <div className="w-full max-w-5xl">
                <button
                    onClick={() => navigate('/images')}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4 cursor-pointer"
                >
                    <span aria-hidden="true">←</span> Back to gallery
                </button>
            </div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-2xl font-bold bg-black/25 p-2 rounded-lg w-full max-w-md"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Add a description..."
                        className="w-full max-w-md h-32 bg-black/25 p-2 rounded-lg resize-none"
                    />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">{image.name}</h1>
                    {image.description && (
                        <p className="text-neutral-200 max-w-md text-center">
                            {image.description}
                        </p>
                    )}
                </>
            )}
            <p className="text-neutral-400">
                Uploaded by {image.creator}
                {image.user_details?.is_premium && (
                    <span className="ml-2 px-2 py-1 bg-[#aa6ced] text-white text-xs rounded-full">
                        Premium
                    </span>
                )}
            </p>
            <img
                src={image.image}
                alt={image.name}
                className="w-full max-w-2xl rounded-lg shadow-lg"
            />
            {/* Only show action buttons if user is owner */}
            {isOwner() && (
                <div className="flex gap-4 mt-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setEditedName(image.name)
                                    setEditedDescription(
                                        image.description || ''
                                    )
                                    setIsEditing(true)
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                title="Delete image"
                            >
                                <TrashIcon />
                            </button>
                        </>
                    )}
                </div>
            )}
            <div className="mt-4 text-sm text-gray-500">
                <p>Quality: {image.quality}%</p>
                <p>Uploaded: {new Date(image.created_at).toLocaleString()}</p>
            </div>
            {groupImages.length > 1 && (
                <div className="w-full max-w-5xl mt-8">
                    <h2 className="text-xl font-bold mb-4">Related Images</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {groupImages.map((img) => (
                            <Link
                                key={img.id}
                                to={`/images/${img.id}?group=${searchParams.get(
                                    'group'
                                )}`}
                                className={`block bg-black/25 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-transform ${
                                    img.id === Number(id)
                                        ? 'ring-2 ring-[#aa6ced]'
                                        : ''
                                }`}
                            >
                                <img
                                    src={img.image}
                                    alt={img.name}
                                    className="w-full h-32 object-cover"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
