# 便利贴

### 技术栈

express less webpack

### 项目初始化

#### 镜像等(要安装 `nrm` 使用 `nrm use` 切换)

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



