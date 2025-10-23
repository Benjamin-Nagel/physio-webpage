/** @type {import('next-sitemap').IConfig} */
module.exports = {
	generateRobotsTxt: true,
	// Wherever are your pages stored
	pagesDirectory: `${__dirname}/src/pages`,
	siteUrl: process.env.PAGE_URL
		? `${process.env.PAGE_URL}`
		: "https://my-fallback-url.com/",
	targetDirectory: `${__dirname}/out`,
	trailingSlash: true,
};
