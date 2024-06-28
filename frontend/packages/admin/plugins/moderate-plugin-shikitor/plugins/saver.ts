import { definePlugin } from "@shikitor/core";

import { DEFAULT_CODE } from "plugins/moderate-plugin-shikitor/common/utils/analyzeHash";
import { zipStr } from "plugins/moderate-plugin-shikitor/common/utils/zipStr";

export default () =>
	definePlugin({
		name: "shikitor-saver",
		onKeydown(e) {
			if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				const code = this.value;
				const url = new URL(location.href);

				let newHashStr = "";
				if (code !== DEFAULT_CODE) {
					newHashStr = `zip-code/${zipStr(code)}`;
				}
				url.hash = newHashStr;
				history.pushState(null, "", url);
			}
		},
	});
