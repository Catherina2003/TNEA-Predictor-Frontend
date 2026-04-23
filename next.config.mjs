/** @type {import('next').NextConfig} */
const nextConfig = {
  // Backend API rewrites — avoids CORS in dev by proxying through Next.js
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig