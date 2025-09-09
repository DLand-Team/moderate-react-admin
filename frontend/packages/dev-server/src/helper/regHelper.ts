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
    const escapedModuleName = moduleName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedModulePath = modulePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let pattern = `import\\s*{\\s*${escapedModuleName}\\s*}\\s*from\\s*"${escapedModulePath}"\\s*;`;

    // Allow for any amount of whitespace (spaces, tabs, newlines) between components
    pattern = pattern.replace(/\\s\*/g, "\\s*");

    return new RegExp(pattern, "m");
  };
  matchLazyInport(variableName: string) {
    const regex = new RegExp(
      `const\\s+${variableName}\\s*=[\\s\\S]*?;\\s*|^\\s*${variableName}\\s*:\\s*.*,?\\s*`,
      "gs",
    );

    // 使用replace方法替换匹配到的lazy导入语句为空字符串，'g'标志表示全局匹配，'m'标志表示多行模式
    return regex;
  }
  matchInport(moduleName, modulePath) {
    const regex = this.generateImportRegex(moduleName, modulePath);
    return regex;
  }
  mathItem(moduleName) {
    const escapedModuleName = moduleName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const pattern = `\\b${escapedModuleName}\\b\\s*,?\\s*`;

    return new RegExp(pattern);
  }
  matchByKey(key: string) {
    const regex = new RegExp(
      `\\s*${key}:\\s*\\{(?:[^{}]|\\{[^{}]*\\})*\\},`,
      "g",
    );
    return regex;
  }
}

export default new Reghelper();
