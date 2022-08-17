/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/instructor/:path*',
        destination: 'http://localhost:5000/instructor/:path*'
      },{
        source: '/result/:path*',
        destination: 'http://localhost:5000/result/path*'
      }
    ]
    :[]
  }
}


module.exports = nextConfig
