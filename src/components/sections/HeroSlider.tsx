'use client'

import HeroSliderClient from './HeroSliderClient'
import {useHeroSlides} from '../../hooks/useAPI'
import {Skeleton} from '../ui/skeleton'

export default function HeroSlider() {
    const {data: slides, isLoading, error} = useHeroSlides()

    if (isLoading) {
        return (
            <div className="container mx-auto min-h-[70vh] relative mb-16 px-4">
                <div className="flex flex-col justify-center items-center space-y-3">
                    <Skeleton className="min-h-[70vh] w-full rounded-xl bg-primary/10 flex justify-between items-center p-14">
                        <div className="w-1/2">
                            <div className="space-y-4 justify-center items-center">
                                <div className="mb-2 space-y-2">
                                    <Skeleton className="h-10 w-[350px]" />
                                    <Skeleton className="h-10 w-[400px]" />
                                </div>
                                <div className="mb-12 space-y-2">
                                    <Skeleton className="h-6 w-[290px]" />
                                    <Skeleton className="h-6 w-[170px]" />
                                </div>
                                <Skeleton className="h-14 w-[210px] rounded-full" />
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                            <Skeleton className="h-90 w-70 rounded-xl" />
                        </div>
                    </Skeleton>
                </div>
            </div>
        )
    }

    if (error || !slides || slides.length === 0) {
        return null
    }

    return <HeroSliderClient slides={slides} />
}
