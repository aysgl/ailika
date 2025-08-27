import {useEffect, useState} from 'react'
import {api} from '../lib/api'
import type {Product} from '../types/product'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        setLoading(true)
        api.listProducts()
            .then(res => {
                if (!mounted) return
                setProducts(res)
                setError(null)
            })
            .catch(err => {
                if (!mounted) return
                setError(err?.message || 'Ürünler yüklenemedi')
            })
            .finally(() => {
                if (!mounted) return
                setLoading(false)
            })
        return () => {
            mounted = false
        }
    }, [])

    return {products, loading, error}
}
