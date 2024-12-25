/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "lh3.googleusercontent.com"], // Allow TMDb's image domain
  },
};

module.exports = nextConfig;
