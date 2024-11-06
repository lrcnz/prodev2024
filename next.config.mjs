import BrowserSyncPlugin from "browser-sync-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config, { isServer, dev }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    // BrowserSyncPlugin
    const serverSideOrProd = isServer || !dev
    if (!serverSideOrProd)
      config.plugins.push(
        new BrowserSyncPlugin(
          {
            host: '0.0.0.0',
            port: 4000,
            open: false,
            proxy: 'http://localhost:3000/',
            notify: false
          },
        ),
      )

    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  env: {
    SERVICE_WORKER_DISABLED: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
};

export default nextConfig;
