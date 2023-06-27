#  moderate-admin-react-antd5

## 技术选型
- React18
- Antd5
- natur或者mobx
- react-router 6.4.3
- vite
- ts

## 启动
```
第一步
yarn

第二步
yarn start
```

## 使用方法
### 配置路由
文件位置 `/package/frontEnd/router/config.tsx`

**配置步骤：**

1. 配置路由id：`ROUTE_ID`
2. 配置路由内容：`ROUTE_INFO_CONFIG`
3. 配置路由结构：`ROUTE_STRUCT_CONFIG`

## 其他配置
### 七你云
文件位置 `/package/backEnd/config/secure.tsx`

```js
module.exports = {
    qiniuConfig: {
        domain: 'http://qiniu.hackslog.cn',
        AK: '自己的',
        SK: '自己的',
        bucket: '自己的'
    }
}
```

这样，一个全栈项目就跑起来了。

有问题就交流，群号：551406017

![闲D岛](https://qiniu.moderate.run/IMG_4020.JPG)