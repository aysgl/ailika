import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Calendar, MapPin, Users} from 'lucide-react'

export default function HeroCard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary">Featured</Badge>
                        <span className="text-sm text-muted-foreground">
                            2 days ago
                        </span>
                    </div>
                    <CardTitle className="text-xl">Design Workshop</CardTitle>
                    <CardDescription>
                        Join us for an interactive design workshop where
                        you&apos;ll learn the fundamentals of modern UI/UX
                        design.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Workshop Preview
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>March 15, 2024 at 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>Online Event</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>24 attendees</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1">Register Now</Button>
                    <Button variant="outline" size="icon">
                        <Users className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
