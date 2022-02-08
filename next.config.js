/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'resources.premierleague.com', 'ichef.bbci.co.uk'],
  }
}

module.exports = nextConfig
