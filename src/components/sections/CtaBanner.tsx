import {Button} from '@/components/ui/button'
import TitleWave from '../TitleWave'
import Link from 'next/link'

export default function CtaBanner() {
    return (
        <section className="container mx-auto py-26">
            <div className="rounded-3xl bg-primary text-white p-10 flex items-center justify-center gap-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <TitleWave
                        title="Become A Ailika Super Star!"
                        headingLevel={3}
                        bandClass="text-white"
                    />
                    <p className="text-white/80 mt-1 text-lg">
                        Earn points & save. Join our loyalty rewards club.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        variant={'secondary'}
                        className=" hover:bg-white/90">
                        <Link href="/shop">Mağazaya Git</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
