import {Heart} from 'lucide-react'

export default function FavoriteRating({rating}: {rating: number}) {
    const r = Math.max(0, Math.min(5, Math.round(rating))) // 0–5 arasında sınırla

    return (
        <div className="flex gap-1 text-secondary" aria-label={`Puan: ${r}/5`}>
            {Array.from({length: 5}).map((_, i) => (
                <Heart
                    key={i}
                    size={16}
                    className={i < r ? 'fill-current' : 'fill-none'}
                />
            ))}
        </div>
    )
}
