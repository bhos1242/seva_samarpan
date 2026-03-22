import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Seva Samarpan – NGO in Pune',
        short_name: 'Seva Samarpan',
        description: 'Free library for students and old age home for elders in Pune.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F8FAFC',
        theme_color: '#F97316',
        icons: [
            {
                src: '/logo/16x16_favicon.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/logo/32x32_favicon.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/logo/logo_high.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    };
}
