/**
 * DynamicWorker Demo
 */

import BASE_DATASETS from './data';

/**
 * 数据转换计算方法
 */
const formatRawData = (data) => {
  console.time('Worker Internal Calculation');

  // base data
  const {airports} = base;

  const {records = []} = data;

  const res = [];

  records.forEach((e) => {
    if (airports.indexOf(e.column) !== -1) {
      res.push([
        // ...
      ]);
    }
  })

  console.timeEnd('Worker Internal Calculation');
  return res;
}

/**
 * DynamicWorker class
 */
class DynamicWorker {
  constructor(worker = formatRawData) {
    // 依赖的全局变量声明，如果 BASE_DATASETS 非字符串形式，可调用 JSON.stringify 等方法进行处理，保证变量的正常声明
    const CONSTS = `const base = ${BASE_DATASETS};`;
    
    // 转换计算方法声明
    const formatFn = `const formatFn = ${worker.toString()};`;
    
    /**
     * 内部 onmessage 处理
     */
    const onMessageHandlerFn = `self.onmessage = ({ data: { data, flag } }) => {
      console.log('Message received from main script');

      const {method} = data;
      if (data.data && method === 'format') {
        self.postMessage({
          data: formatFn(data.data),
          flag
        });
      }

      console.log('Posting message back to main script');
    }`;

    /**
     * 返回结果
     * @param {*} param0 
     */
    const handleResult = ({ data: { data, flag } }) => {
      const resolve = this.flagMapping[flag];
      
      if (resolve) {
        resolve(data);
        delete this.flagMapping[flag];
      }
    }
    
    const blob = new Blob([`(()=>{${CONSTS}${formatFn}${onMessageHandlerFn}})()`]);
    this.worker = new Worker(URL.createObjectURL(blob));
    this.worker.addEventListener('message', handleResult);

    this.flagMapping = {};
    URL.revokeObjectURL(blob);
  }

  /**
   * 动态调用
   */
  send(data) {
    const w = this.worker;
    const flag = new Date().toString();
    w.postMessage({
      data,
      flag,
    });

    return new Promise((res) => {
      this.flagMapping[flag] = res;
    })
  }

  close() {
    this.worker.terminate();
  }
}

export default DynamicWorker;
