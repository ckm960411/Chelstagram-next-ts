/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['w.namu.la', 'res.cloudinary.com', 'resources.premierleague.com'],
  }
}

module.exports = nextConfig
