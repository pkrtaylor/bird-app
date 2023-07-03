/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icon-library.com',
        port: '',
        pathname: '/images/twitter-icon-svg/twitter-icon-svg-28.jpg',
      },
      {
        protocol: 'https',
        hostname: 'icon-library.com',
        port: '',
        pathname: '/images/twitter-icon-eps/twitter-icon-eps-10.jpg',
      },
    ],
  },
  
}

module.exports = nextConfig
