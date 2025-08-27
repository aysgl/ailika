import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    images: {
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
            }
        ]
    }
}

export default nextConfig
