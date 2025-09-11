import HeroSlider from '../components/sections/HeroSlider'
import FavoriteProducts from '../components/sections/FavoriteProducts'
import Categories from '../components/sections/Categories'
import CtaBanner from '../components/sections/CtaBanner'
import TrendingProducts from '../components/sections/TrendingProducts'
import InstagramFeed from '@/components/sections/InstagramFeed'
import ColorPalette from '@/components/sections/ColorPalette'
import Newsletter from '@/components/sections/Newsletter'
import ShopByColor from '@/components/sections/ShopByColor'
import PopularColor from '@/components/sections/PopularColor'
import Blogs from '@/components/sections/Blogs'
import {blogs} from '@/lib/blogs'
import {DiscountBanner} from '@/components/DiscountBanner'

export default function Home() {
    return (
        <>
            <DiscountBanner />
            <HeroSlider />
            <FavoriteProducts />
            <ShopByColor />
            <PopularColor />
            <Categories />
            <CtaBanner />
            <TrendingProducts />
            <InstagramFeed />
            <Blogs posts={blogs} />
            <ColorPalette />
            <Newsletter />
        </>
    )
}
