/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:          {
        domains: [ "farm1.staticflickr.com" ],

        loader: "akamai",
        path:   "/CSC3007-project"
    },

    basePath:    "/CSC3007-project",
    assetPrefix: "/CSC3007-project",
};
  
module.exports = nextConfig;