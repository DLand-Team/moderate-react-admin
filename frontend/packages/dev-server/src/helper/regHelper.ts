class Reghelper {
	// 一个函数，作用是往数组字符中插入一条数据，函数名应该起啥
	insertItemIntoStrArrStr = (arrStr, newItem) => {
		const { toFromat } = require("./devHelper");
		const arrStrTemp = toFromat(arrStr);
		const updatedarrStrTempString = arrStrTemp.replace(
			/(\[)([^[]*)(\])/g,
			(_match, openingBracket, content, closingBracket) => {
				let updatedContent = content.trim();
				if (updatedContent.endsWith(",")) {
					updatedContent += `\n${JSON.stringify(newItem, null, 2).replace(/\"/g, "")}`;
				} else {
					updatedContent += `,\n${JSON.stringify(newItem, null, 2).replace(/\"/g, "")}`;
				}
				return `${openingBracket}${updatedContent}${closingBracket}`;
			},
		);
		let newArrStr = toFromat(updatedarrStrTempString).replace(/\n+$/, "");
		return newArrStr;
	};

	getStrBetween = (str, start, end) => {
		if (start instanceof RegExp) {
			start = start.source;
		}
		if (end instanceof RegExp) {
			end = end.source;
		}

		const regex = new RegExp(`${start}([\\s\\S]*?)${end}`);
		const match = str.match(regex);
		return match;
	};
	generateImportRegex = (moduleName, modulePath) => {
		const escapedModuleName = moduleName.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&",
		);
		const escapedModulePath = modulePath.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&",
		);

		let pattern = `import\\s*{\\s*${escapedModuleName}\\s*}\\s*from\\s*"${escapedModulePath}"\\s*;`;

		// Allow for any amount of whitespace (spaces, tabs, newlines) between components
		pattern = pattern.replace(/\\s\*/g, "\\s*");

		return new RegExp(pattern, "m");
	};
	matchInport(moduleName, modulePath) {
		const regex = this.generateImportRegex(moduleName, modulePath);
		return regex;
	}
	mathItem(moduleName) {
		const escapedModuleName = moduleName.replace(
			/[.*+?^${}()|[\]\\]/g,
			"\\$&",
		);

		const pattern = `\\b${escapedModuleName}\\b\\s*,?\\s*`;

		return new RegExp(pattern);
	}
}

export default new Reghelper();
