'use client'

import {ArrowRight} from 'lucide-react'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import TitleWave from '../TitleWave'
import MoreButton from '../MoreButton'
import Image from 'next/image'
import {Post} from '@/types/blog'

interface BlogsProps {
    tagline?: string
    heading?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    posts?: Post[]
}

export default function Blogs({posts = []}: BlogsProps) {
    return (
        <section className="container mx-auto py-16">
            <div className="flex flex-col items-center">
                <TitleWave
                    title="Ailika'dan Haberler"
                    headingLevel={2}
                    bandClass="text-secondary"
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full mt-6">
                    {posts.map(post => (
                        <Card
                            key={post.id}
                            className="grid grid-rows-[auto_auto_1fr_auto] pt-0 group">
                            <div className="aspect-video w-full">
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={100}
                                        height={100}
                                        className="transition-all duration-200 h-full w-full object-cover object-center rounded-xl group-hover:scale-[0.99]"
                                    />
                                </a>
                            </div>

                            <CardHeader className="pt-4">
                                <h3 className="text-lg font-semibold group-hover:text-primary md:text-xl">
                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {post.title}
                                    </a>
                                </h3>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground">
                                    {post.summary}
                                </p>
                            </CardContent>

                            <CardFooter>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-foreground">
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <MoreButton href="/blogs">Tüm bloglar</MoreButton>
            </div>
        </section>
    )
}
