export default function StarRating({rating}: {rating: number}) {
    const r = Math.max(0, Math.min(5, Math.round(rating)))
    return (
        <div className="text-amber-500 text-sm" aria-label={`Puan: ${r}/5`}>
            {'★★★★★☆☆☆☆☆'.slice(5 - r, 10 - r)}
        </div>
    )
}
