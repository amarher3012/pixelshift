import { useState, useEffect } from 'react'
import { Link } from 'react-router'

import axios from '../features/axiosConfig'
import { ApiError } from '../types/errors'

interface ImageItem {
    id: number
    name: string
    image: string
    quality: number
    created_at: string
    creator: string
    is_public: boolean
    description: string | null
}

interface Filters {
    name: string
    creator: string
    dateRange: 'all' | 'today' | 'week' | 'month'
    sortBy: 'newest' | 'oldest' | 'name'
}

function FilterBar({
    filters,
    onFilterChange,
    isVisible,
    onToggleVisibility,
}: {
    filters: Filters
    onFilterChange: (newFilters: Filters) => void
    isVisible: boolean
    onToggleVisibility: () => void
}) {
    return (
        <div className="sticky top-20 z-40 mb-6">
            <button
                onClick={onToggleVisibility}
                className="md:hidden w-full p-4 bg-black/25 backdrop-blur-sm rounded-lg mb-2 text-left flex justify-between items-center"
            >
                <span>Filters</span>
                <span>{isVisible ? '↑' : '↓'}</span>
            </button>
            <div
                className={`${
                    isVisible ? 'block' : 'hidden'
                } md:block p-4 bg-black/25 backdrop-blur-sm rounded-lg`}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Filter by name..."
                        value={filters.name}
                        onChange={(e) =>
                            onFilterChange({ ...filters, name: e.target.value })
                        }
                        className="p-2 rounded-lg bg-black/25 border border-neutral-700 focus:border-[#aa6ced] outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Filter by creator..."
                        value={filters.creator}
                        onChange={(e) =>
                            onFilterChange({
                                ...filters,
                                creator: e.target.value,
                            })
                        }
                        className="p-2 rounded-lg bg-black/25 border border-neutral-700 focus:border-[#aa6ced] outline-none"
                    />
                    <select
                        value={filters.dateRange}
                        onChange={(e) =>
                            onFilterChange({
                                ...filters,
                                dateRange: e.target
                                    .value as Filters['dateRange'],
                            })
                        }
                        className="p-2 rounded-lg bg-black/25 border border-neutral-700 focus:border-[#aa6ced] outline-none"
                    >
                        <option value="all">All time</option>
                        <option value="today">Today</option>
                        <option value="week">This week</option>
                        <option value="month">This month</option>
                    </select>
                    <select
                        value={filters.sortBy}
                        onChange={(e) =>
                            onFilterChange({
                                ...filters,
                                sortBy: e.target.value as Filters['sortBy'],
                            })
                        }
                        className="p-2 rounded-lg bg-black/25 border border-neutral-700 focus:border-[#aa6ced] outline-none"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default function ImageHub() {
    const [images, setImages] = useState<ImageItem[]>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const [filters, setFilters] = useState<Filters>({
        name: '',
        creator: '',
        dateRange: 'all',
        sortBy: 'newest',
    })

    useEffect(() => {
        axios
            .get('compression/images/')
            .then((response) => {
                setImages(Array.isArray(response.data) ? response.data : [])
                setError('')
            })
            .catch((err: ApiError) => {
                setError(err.response?.data?.detail || 'Failed to load images')
                setImages([])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const filteredImages = images
        .filter((image) => {
            if (
                filters.name &&
                !image.name.toLowerCase().includes(filters.name.toLowerCase())
            ) {
                return false
            }
            if (
                filters.creator &&
                !image.creator
                    .toLowerCase()
                    .includes(filters.creator.toLowerCase())
            ) {
                return false
            }
            if (filters.dateRange !== 'all') {
                const date = new Date(image.created_at)
                const now = new Date()
                const weekAgo = new Date(now.getTime())
                weekAgo.setDate(weekAgo.getDate() - 7)
                const monthAgo = new Date(now.getTime())
                monthAgo.setMonth(monthAgo.getMonth() - 1)

                switch (filters.dateRange) {
                    case 'today':
                        if (date.toDateString() !== now.toDateString())
                            return false
                        break
                    case 'week':
                        if (date < weekAgo) return false
                        break
                    case 'month':
                        if (date < monthAgo) return false
                        break
                }
            }
            return true
        })
        .sort((a, b) => {
            switch (filters.sortBy) {
                case 'newest':
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                case 'oldest':
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    )
                case 'name':
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

    const pageCount = Math.ceil(filteredImages.length / itemsPerPage)
    const paginatedImages = filteredImages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [filters])

    if (isLoading) {
        return <div className="text-center mt-20">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center mt-20">{error}</div>
    }

    return (
        <div className="container mx-auto px-4 my-5 min-h-[calc(100vh-8rem)]">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Image Gallery</h1>
                <FilterBar
                    filters={filters}
                    onFilterChange={setFilters}
                    isVisible={isFilterVisible}
                    onToggleVisibility={() =>
                        setIsFilterVisible(!isFilterVisible)
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedImages.map((image) => (
                        <Link
                            key={image.id}
                            to={`/images/${image.id}`}
                            className="block bg-black/25 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
                        >
                            <img
                                src={image.image}
                                alt={image.name}
                                className="w-full h-48 object-cover bg-black/25"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">
                                    {image.name}
                                </h2>
                                {image.description && (
                                    <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
                                        {image.description}
                                    </p>
                                )}
                                <p className="text-sm text-neutral-400 mt-2">
                                    By {image.creator}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                {pageCount > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-black/25 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Previous
                        </button>
                        <div className="flex items-center px-4">
                            Page {currentPage} of {pageCount}
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageCount}
                            className="px-4 py-2 rounded-lg bg-black/25 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            {paginatedImages.length === 0 && !isLoading && !error && (
                <div className="text-center text-gray-500 mt-8">
                    No images found matching your filters
                </div>
            )}
        </div>
    )
}
