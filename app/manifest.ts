import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tarids Money',
    short_name: 'Tarids Money',
    description: 'Tarids Money',
    start_url: '/pwa',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f7f6f1',
    // icons: [
    //   {
    //     src: '/icon-192x192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon-512x512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //   },
    // ],
  };
}
