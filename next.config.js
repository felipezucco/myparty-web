/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    BASE_URL: process.env.MYPARTY_API,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}