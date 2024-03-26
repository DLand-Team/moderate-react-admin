class Reghelper {
    // 一个函数，作用是往数组字符中插入一条数据，函数名应该起啥
    insertItemIntoStrArrStr = (arrStr, newItem) => {
        const { toFromat } = require('./devHelper')
        const arrStrTemp = toFromat(arrStr);
        const updatedarrStrTempString = arrStrTemp.replace(/(\[)([^[]*)(\])/g, (_match, openingBracket, content, closingBracket) => {
            let updatedContent = content.trim();
            if (updatedContent.endsWith(',')) {
                updatedContent += `\n${JSON.stringify(newItem, null, 2).replace(/\"/g, "")}`;
            } else {
                updatedContent += `,\n${JSON.stringify(newItem, null, 2).replace(/\"/g, "")}`;
            }
            return `${openingBracket}${updatedContent}${closingBracket}`;
        })
        let newArrStr = toFromat(updatedarrStrTempString).replace(/\n+$/, '')
        return newArrStr
    }

     getStrBetween = (str, start, end) => {
        if (start instanceof RegExp) {
          start = start.source;
        }
        if (end instanceof RegExp) {
          end = end.source;
        }
      
        const regex = new RegExp(`${start}([\\s\\S]*?)${end}`);
        const match = str.match(regex);
        return match
      };

}

export default new Reghelper()