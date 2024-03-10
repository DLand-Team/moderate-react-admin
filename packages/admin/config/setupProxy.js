const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	let proxy = {
		"/javaApi": {
			target: "http://localhost:8000/",
			changeOrigin: true,
			pathRewrite: {
				"^/javaApi": "",
			},
		},
		"/api": {
			target: "http://localhost:8681/",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "",
			},
		},
		"/nestApi": {
			// target: "http://111.229.110.163:3001/",
			target: "https://admin.scaling.com.au",
			// target: "http://localhost:3001",
			// target: "http://13.211.212.227:9090/",Ï
			changeOrigin: true,
			pathRewrite: {
				"^/nestApi": "/api",
			},
		},
	};
	for (let item of Object.entries(proxy)) {
		const [key, data] = item;
		app.use(key, createProxyMiddleware(data));
	}
};
