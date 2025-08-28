import Link from 'next/link'

export const dynamic = 'force-static'

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Contact</h1>
            <p className="text-foreground-600 mb-6">
                Have questions or feedback? Reach out and well get back to you.
            </p>
            <div className="space-y-3 text-foreground-700">
                <p>
                    Email:{' '}
                    <a className="underline" href="mailto:hello@example.com">
                        hello@example.com
                    </a>
                </p>
                <p>
                    Instagram:{' '}
                    <Link className="underline" href="#">
                        @nailart
                    </Link>
                </p>
            </div>
        </main>
    )
}
