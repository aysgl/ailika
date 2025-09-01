import InstagramGallery from '../InstagramGallery'
import TitleWave from '../TitleWave'

export default function InstagramFeed() {
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
