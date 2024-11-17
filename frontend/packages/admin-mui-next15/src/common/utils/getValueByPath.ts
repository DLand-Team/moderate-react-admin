export const getValueByPath = (
  keyStr: string,
  data: Record<PropertyKey, any>,
  options: Record<PropertyKey, any>
) => {
  // key拆分
  let keyArr = keyStr.split('-');
  let currentData = data;
  let result;
  for (let i = 0, n = keyArr.length; i < n; i++) {
    let key = keyArr[i];
    if (key.includes('.')) {
      // 查询的目标值
      key = keyArr[i].split('.')[0];
      let targetStr = keyArr[i].split('.')[1];
      let currentDataItem = currentData[key];
      if (!currentDataItem) return null;
      let currentDataArr = Array.isArray(currentDataItem) ? currentDataItem : [currentDataItem];
      let res = [];
      if (targetStr !== 'ALL') {
        res = currentDataArr.filter((item) => {
          let tempArr = options[targetStr];
          tempArr = Array.isArray(tempArr) ? tempArr : [tempArr];
          return tempArr.includes(item?.[targetStr]);
        });
      } else {
        res = currentDataArr;
      }
      if (!res.length) {
        break;
      }
      if (res.length) {
        if (i != n - 1) {
          let resultTemp: any = res
            .map((resItem) => {
              return getValueByPath(keyArr.slice(i + 1).join('-'), resItem, options);
            })
            .filter((item) => {
              return item;
            });
          if (targetStr == 'ALL') {
            result = resultTemp;
          } else {
            result = Array.prototype.concat.apply([], resultTemp);
          }
        } else {
          result = res;
        }
        return result.filter((item: any) => {
          return item;
        });
      }
    }
    {
      currentData = currentData?.[key];
      if (!currentData) {
        // console.warn('不存在' + key);
        return;
      }
      if (i == n - 1) {
        result = currentData;
      } else {
        if (Array.isArray(currentData)) {
          let resultTemp: any = currentData
            .map((resItem) => {
              return getValueByPath(keyArr.slice(i + 1).join('-'), resItem, options);
            })
            .filter((item) => {
              return item;
            });
          result = Array.prototype.concat.apply([], resultTemp);
          return result.filter((item) => {
            return item;
          });
        }
      }
    }
  }
  return result;
};
