import {useQuery} from '@tanstack/react-query'

async function fetchCategories() {
    const res = await fetch('/api/categories')
    if (!res.ok) throw new Error('Kategoriler alınamadı')
    return res.json()
}

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })
}
