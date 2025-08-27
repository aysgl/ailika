import Image from 'next/image'

export default function InstagramFeed() {
    const items = Array.from({length: 6}).map(
        () => `/images/hero-slider/nail-polish.png`
    )
    return (
        <section className="container mx-auto py-16">
            <h2 className="text-2xl font-semibold mb-6">Instagram</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((src, idx) => (
                    <div
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden bg-foreground/5">
                        <Image
                            src={src}
                            alt={`IG ${idx + 1}`}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
