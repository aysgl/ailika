'use client'

import * as React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface ShopFiltersProps {
    categories: string[]
    brands: string[]
    onFilterChange: (category: string, brand: string) => void
}

export default function ShopFilters({
    categories,
    brands,
    onFilterChange
}: ShopFiltersProps) {
    const [selectedCategory, setSelectedCategory] = React.useState('all')
    const [selectedBrand, setSelectedBrand] = React.useState('all')

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        onFilterChange(
            value === 'all' ? '' : value,
            selectedBrand === 'all' ? '' : selectedBrand
        )
    }

    const handleBrandChange = (value: string) => {
        setSelectedBrand(value)
        onFilterChange(
            selectedCategory === 'all' ? '' : selectedCategory,
            value === 'all' ? '' : value
        )
    }

    return (
        <div className="flex flex-wrap gap-4">
            {/* Kategori Seçici */}
            <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tüm Kategoriler" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    {categories.map(c => (
                        <SelectItem key={c} value={c}>
                            {c}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Marka Seçici */}
            <Select value={selectedBrand} onValueChange={handleBrandChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tüm Markalar" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tüm Markalar</SelectItem>
                    {brands.map(b => (
                        <SelectItem key={b} value={b}>
                            {b}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
