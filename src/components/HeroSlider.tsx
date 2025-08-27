import {api} from '../lib/api'
import HeroSliderClient from './HeroSliderClient'

export default async function HeroSlider() {
    const slides = await api.listHeroSlides()
    if (!slides || slides.length === 0) return null
    return <HeroSliderClient slides={slides} />
}
