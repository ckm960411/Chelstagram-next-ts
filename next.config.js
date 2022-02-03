/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'resources.premierleague.com'],
  }
}

module.exports = nextConfig
