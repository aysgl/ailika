import HeroSlider from '../components/HeroSlider'
import FavoriteProducts from '../components/sections/FavoriteProducts'
import Categories from '../components/sections/Categories'
import CtaBanner from '../components/sections/CtaBanner'
import TrendingProducts from '../components/sections/TrendingProducts'
import InstagramFeed from '@/components/sections/InstagramFeed'
import ColorPalette from '@/components/sections/ColorPalette'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
    return (
        <>
            <HeroSlider />
            <FavoriteProducts />
            <Categories />
            <CtaBanner />
            <TrendingProducts />
            <InstagramFeed />
            <ColorPalette />
            <Newsletter />
        </>
    )
}
