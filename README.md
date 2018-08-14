# 便利贴

## 技术栈

express less webpack

## 项目初始化

### 版本
镜像等(要安装 `nrm` 使用 `nrm use` 切换)

```shell
$ node -v
v9.5.0
$ npm -v
6.2.0
$ nrm  ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/

```

### [安装 `Express`](http://expressjs.com/zh-cn/)

```shell
npm init -y
npm i express --save
```

### [`Express` 应用程序生成器](http://expressjs.com/zh-cn/starter/generator.html)

```shell
npm install express-generator --save-dev  ./node_modules/express-generator/bin/express-cli.js  -f -e .
npm i
npm start
```

这样打开 `http://127.0.0.1:3000` 项目就已经初始化成功了。

### [中间件](http://expressjs.com/zh-cn/guide/using-middleware.html)

## `Webpack` 配置

### 完善文件目录

![](./src/imgs/list.png)

### [引入 `Webpack`](https://www.webpackjs.com/guides/installation/#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)

```shell
npm i webpack --save-dev 
npm i webpack-cli --save-dev
```

为了测试我们的 `webpack` 能否正常的运行我们先简单试下功能

#### `src/js/app/index.js`

```javascript
var obj = require('../mod/b.js')
console.log(obj)
```
#### `src/js/mod/a.js`

```javascript
module.exports.a = 'aaaaaa'
```
#### `src/js/mod/b.js`

```javascript
var a = require('./a.js').a
module.exports = {
  a: a,
  b: 'bbbbb'
}
```
#### `webpack.config.js`
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/js')
  }
};
```

然后在命令行运行可以看到

#### shell

```shell
npx webpack --config webpack.config.js 
Hash: cb77b25fdba0777b168c
Version: webpack 4.16.5
Time: 85ms
Built at: 2018-08-14 16:23:39
   Asset      Size  Chunks             Chunk Names
index.js  4.58 KiB    main  [emitted]  main
Entrypoint main = index.js
[./src/js/app/index.js] 50 bytes {main} [built]
[./src/js/mod/a.js] 28 bytes {main} [built]
[./src/js/mod/b.js] 69 bytes {main} [built]

```







[TOC]

