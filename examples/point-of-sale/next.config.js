/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/new',
                permanent: false,
                has: [
                    {
                        type: 'query',
                        key: 'recipient',
                    },
                    {
                        type: 'query',
                        key: 'label',
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/**',
            },
        ],
    },
};

module.exports = nextConfig;
