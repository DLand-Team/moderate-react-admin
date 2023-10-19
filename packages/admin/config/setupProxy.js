const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	let proxy = {
		"/dev": {
			target: "http://localhost:8681",
			changeOrigin: true,
			pathRewrite: {
				"^/dev": "",
			},
		},
		"/api": {
			target: "http://111.229.110.163:80",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "",
			},
		},
	};
	for (let item of Object.entries(proxy)) {
		const [key, data] = item;
		app.use(key, createProxyMiddleware(data));
	}
};
