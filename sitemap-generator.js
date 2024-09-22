import SitemapGenerator from 'sitemap-generator';

const generator = SitemapGenerator('https://artedelpulito.vercel.app', {
  filepath: './public/sitemap.xml',
  maxEntriesPerFile: 50000,
  stripQuerystring: true,
});

generator.start();
