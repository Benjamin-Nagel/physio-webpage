/** @type {import('next-sitemap').IConfig} */
// process.env.PAGE_URL
module.exports = {
	// Wherever are your pages stored
	pagesDirectory: `${__dirname}/src/pages`,
	targetDirectory: `${__dirname}/out`,
	trailingSlash: true,

	siteUrl: process.env.PAGE_URL
		? `${process.env.PAGE_URL}`
		: "https://my-fallback-url.com/",
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
  alternateRefs: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}