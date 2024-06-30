/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ]
    :[]
  },
  output: 'export'
}


module.exports = nextConfig
