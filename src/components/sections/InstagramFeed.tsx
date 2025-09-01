import Image from 'next/image'
import InstagramGallery from '../InstagramGallery'
import TitleWave from '../TitleWave'

export default function InstagramFeed() {
    const items = Array.from({length: 6}).map(
        () => `/images/hero-slider/nail-polish.png`
    )
    return (
        <section className="container mx-auto py-16">
            <TitleWave
                title="Instagram'da #ailika"
                headingLevel={2}
                bandClass="text-secondary"
            />
            <div className="mt-6">
                <InstagramGallery cols={4} limit={8} />
            </div>
        </section>
    )
}
