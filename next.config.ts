import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    // Treat iyzipay as a server external dependency to avoid bundling issues
    serverExternalPackages: ['iyzipay'],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.ellisan.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'www.dndgel.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'sandbox-static.iyzipay.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**'
            }
        ]
    }
}

export default nextConfig
