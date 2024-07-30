import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "Redux Eazy",
	tagline: "Redux Eazy are cool",
	favicon: "img/redux-eazy-logo.svg",
	// Set the production url of your site here
	url: "https://dland-team.github.io",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/redux-eazy/",
	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "dland-team", // Usually your GitHub org/user name.
	projectName: "redux-eazy", // Usually your repo name.
	deploymentBranch: "gh-pages",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	// i18n: {
	// 	defaultLocale: "zh",
	// 	locales: ["en", "zh"],
	// 	path: "i18n",
	// 	localeConfigs: {
	// 		en: {
	// 			label: "English",
	// 			direction: "ltr",
	// 			htmlLang: "en-US",
	// 			calendar: "gregory",
	// 			path: "en",
	// 		},
	// 		zh: {
	// 			label: "中文",
	// 			direction: "ltr",
	// 			htmlLang: "zh-CN",
	// 			calendar: "gregory",
	// 			path: "zh",
	// 		},
	// 	},
	// },
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://dland-team.github.io/redux-eazy",
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://dland-team.github.io/redux-eazy",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		algolia: {
			// The application ID provided by Algolia
			appId: "YOUR_APP_ID",

			// Public API key: it is safe to commit it
			apiKey: "YOUR_SEARCH_API_KEY",

			indexName: "YOUR_INDEX_NAME",

			// Optional: see doc section below
			contextualSearch: true,

			// Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
			externalUrlRegex: "external\\.com|domain\\.com",

			// Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
			replaceSearchResultPathname: {
				from: "/docs/", // or as RegExp: /\/docs\//
				to: "/",
			},

			// Optional: Algolia search parameters
			searchParameters: {},

			// Optional: path for search page that enabled by default (`false` to disable it)
			searchPagePath: "search",

			//... other Algolia params
		},
		colorMode: {
			defaultMode: "dark",
		},
		// Replace with your project's social card
		image: "img/docusaurus-social-card.jpg",
		navbar: {
			title: "Redux Eazy",
			logo: {
				alt: "My Site Logo",
				src: "img/redux-eazy-logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "教程",
				},
				{ to: "/blog", label: "记录", position: "left" },
				{
					href: "https://github.com/DLand-Team/redux-eazy",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Tutorial",
							to: "/docs/intro",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "123",
							to: "/blog",
						},
						{
							label: "GitHub",
							href: "https://github.com/DLand-Team/redux-eazy",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
	plugins: ["docusaurus-plugin-sass"],
};

export default config;
