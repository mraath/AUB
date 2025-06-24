/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV = 'production';

const nextConfig = {
  output: 'export', // Makes Next.js produce static HTML/CSS/JS
  reactStrictMode: true,
  basePath: isProd ? '/AUB' : '', // IMPORTANT: Matches your repository name
  assetPrefix: isProd ? '/AUB/' : '', // IMPORTANT: Matches your repository name with trailing slash
  images: {
    unoptimized: true, // Often needed for static export
  },
  //trailingSlash: true, // Optional: Helps with static file naming
  
  //distDir: 'out',

  // Remove rewrites since they don't work with static export
  /*
  env: {
    // Add any environment variables needed for search
    SEARCH_INDEX_PATH: '/search-index.json',
  }
  */

  //pageExtensions: ['js', 'jsx'],
  // Configure static assets
  /*
  async rewrites() {
    return [
      {
        source: '/legacy-page/:path*',
        destination: '/legacy-page/:path*',
      },
      {
        source: '/search-site',
        destination: '/search-site',
      },
      {
        source: '/contact-us',
        destination: '/contact-us',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      }
    ];
  }
    */
};

module.exports = nextConfig;
