/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// next.config.js

module.exports = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
      // Exclude pages with server-side rendering enabled
      const excludedPages = ['/', '/sneakers', "/accessories"];
  
      // Filter out the excluded pages
      const filteredPathMap = Object.keys(defaultPathMap).reduce((pathMap, path) => {
        if (!excludedPages.includes(path)) {
          pathMap[path] = defaultPathMap[path];
        }
        return pathMap;
      }, {});
  
      return filteredPathMap;
    },
  };
  


