/** @type {import('next-sitemap').IConfig} */
// process.env.PAGE_URL
module.exports = {
	alternateRefs: [],
	changefreq: "weekly",
	exclude: [],
	generateRobotsTxt: true,
	// Wherever are your pages stored
	pagesDirectory: `${__dirname}/src/pages`,
	priority: 0.7,
	robotsTxtOptions: {
		policies: [
			{
				allow: "/",
				userAgent: "*",
			},
		],
	},
	sitemapSize: 5000,

	siteUrl: process.env.PAGE_URL
		? `${process.env.PAGE_URL}`
		: "https://my-fallback-url.com/",
	targetDirectory: `${__dirname}/out`,
	trailingSlash: true,
};
