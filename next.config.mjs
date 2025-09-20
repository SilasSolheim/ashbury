// Static export for GitHub Pages; basePath/assetPrefix via env
const isProd = process.env.NODE_ENV === 'production'
const repo = process.env.NEXT_PUBLIC_BASE_PATH || '' // e.g., 'ashbury-chronicles'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd && repo ? `/${repo}` : '',
  assetPrefix: isProd && repo ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: { serverActions: { bodySizeLimit: '2mb' } }
}
export default nextConfig
