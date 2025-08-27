import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Star, MapPin, Clock} from 'lucide-react'

export default function HeroBackground() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md overflow-hidden">
                <div
                    className="relative h-80 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/placeholder.svg?height=400&width=600')`
                    }}>
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc/70 via-zinc/20 to-transparent" />

                    {/* Top badge */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            Featured
                        </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">
                            4.8
                        </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">
                            Mountain Adventure
                        </h2>
                        <p className="text-white/90 mb-4 text-sm leading-relaxed">
                            Experience breathtaking views and unforgettable
                            moments in the heart of nature&apos;s paradise.
                        </p>

                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>Swiss Alps</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>3 days</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold">$299</span>
                                <span className="text-white/70 ml-1">
                                    per person
                                </span>
                            </div>
                            <Button className="bg-white text-zinc hover:bg-white/90">
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
