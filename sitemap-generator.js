require('babel-register')({
    presets: ['es2015', 'react']
  });
  
  const router = require('./src/App').default;
  const Sitemap = require('react-router-sitemap').default;
  
  function generateSitemap() {
    return (
      new Sitemap(router)
          .build('https://artedelpulito.vercel.app/')
          .save('./public/sitemap.xml')
    );
  }
  
  generateSitemap();