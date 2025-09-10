import InstagramGallery from '../InstagramGallery'
import TitleWave from '../TitleWave'

export default function InstagramFeed() {
    return (
        <section className="container mx-auto xl:px-0 px-2 py-12">
            <TitleWave
                title="Instagram'da #ailika"
                headingLevel={2}
                bandClass="text-secondary"
            />
            <div className="mt-6">
                <InstagramGallery cols={4} limit={7} />
            </div>
        </section>
    )
}
