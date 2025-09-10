import {Post} from '@/types/blog'

export const blogs: Post[] = [
    {
        id: 'nail-1',
        title: 'Elegant Marble Nail Art Tutorial',
        summary:
            'Learn how to create stunning marble nail designs at home with easy-to-follow steps and minimal tools.',
        label: 'Tutorial',
        author: 'Ayşegül Avcu',
        published: '2025-09-09',
        url: 'https://example.com/nail-marble-tutorial',
        image: 'https://img.freepik.com/free-photo/close-up-hand-beautiful-flower_23-2149311566.jpg?t=st=1757454590~exp=1757458190~hmac=c0fbf6272549dac56de08cc905f3956cfb2504f00ce3c5bb54861f384df924c0&w=2000'
    },
    {
        id: 'nail-2',
        title: 'Top 5 Pastel Nail Designs for Summer',
        summary:
            'Explore the most popular pastel nail art trends for this summer and get inspired for your next manicure.',
        label: 'Trends',
        author: 'Ayşegül Avcu',
        published: '2025-09-09',
        url: 'https://example.com/pastel-nail-designs',
        image: 'https://img.freepik.com/free-photo/beautiful-nail-art-presentation_23-2149295354.jpg?t=st=1757454198~exp=1757457798~hmac=46d1f285b4bccf679d427c9a34c8892bd10f52fef2ea54534a5abfbea8df003a&w=2000'
    },
    {
        id: 'nail-4',
        title: 'Minimalist Nail Art Ideas for Beginners',
        summary:
            'Discover simple yet elegant minimalist nail designs that are perfect for beginners and everyday wear.',
        label: 'Inspiration',
        author: 'Ayşegül Avcu',
        published: '2025-09-09',
        url: 'https://example.com/minimalist-nail-art',
        image: 'https://img.freepik.com/free-photo/close-up-beautiful-manicure-flower_23-2149311568.jpg?t=st=1757454373~exp=1757457973~hmac=636df75623a0c63a2016b04812c8a6d72c42f7ea42973b1d039c87930676a17a&w=2000'
    }
]

export function getBlogById(id: string): Post | undefined {
    return blogs.find(p => p.id === id)
}
