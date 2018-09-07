<p align="center">![](./notes.png)</p>


# <p align="center">[简贴](http://snote.liuzhaoyang.space)</p>

## 项目介绍

`HTML` 使用了 `ejs`，`CSS` 使用了 `Less` ，`JavaScript` 使用了 `jQuery` ，`node` 端使用 `express`来促进开发，使用 `webpack` 进行打包，存储数据用的 `sqlite`，登录管理是使用的 `GitHub` 提供的 `OAuth Apps`。本来自己也用 `JavaScript` 实现了一个简单的瀑布流后改用 `masonry-layout`。通过这个项目对前后端的联调认识更加深入，后面通过 `pm2` `nginx` 部署在自己的服务器上。

## 技术栈

- express 
- less 
- webpack 
- jQuery 
- sqlite
- masonry-layout

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
  mode: 'development',//代码不进行压缩还有生产环境
  entry: './src/js/app/index.js',//入口
  output: {//出口
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

运行无误

### 使用 NPM 脚本 `NPM Scripts`

#### `package.json`

```javascript
  "scripts": {
    "start": "node ./bin/www",
+   "build": "webpack"
  },
```

#### shell

```shell
 npm run build  

> sticky-note@0.0.0 build /home/marsorsun/Desktop/repo/sticky-note
> webpack

Hash: cb77b25fdba0777b168c
Version: webpack 4.16.5
Time: 88ms
Built at: 2018-08-14 16:42:48
   Asset      Size  Chunks             Chunk Names
index.js  4.58 KiB    main  [emitted]  main
Entrypoint main = index.js
[./src/js/app/index.js] 50 bytes {main} [built]
[./src/js/mod/a.js] 28 bytes {main} [built]
[./src/js/mod/b.js] 69 bytes {main} [built]

```

## 组件 `Toast`

### `src/js/mod/toast.js`

```javascript
require('less/toast.less')

function toast(msg, time) {
  this.msg = msg
  this.dismissTime = time || 1000
  this.createToast()
  this.showToast()
}

toast.prototype = {
  createToast() {
    var template = `<div class="toast"> ${this.msg} </div>`;
    this.$toast = $(template)
    $('body').append(this.$toast)
  },
  showToast() {
    this.$toast.fadeIn(300, () => {
      setTimeout(() => {
        this.$toast.fadeOut(300, () => {
          this.$toast.remove()
        })
      }, this.dismissTime)
    })
  }
}

function Toast(msg, time){
  return new toast(msg, time)
}

module.exports.Toast = Toast
```



### 继续调整 `webpack` 配置

#### loader

由于我们使用了 `Less` 所以要使用 `loader` 使用前需要在 `shell` 

```shell
npm i style-loader css-loader less-loader less --save-dev
```

再来更改 `webpack.config.js`

```JavaScript
  module: {
    rules: [{
      test: /\.less$/,//匹配所有的后缀为 less 的文件
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
```
#### 自动更新
我们肯定不希望每一次更改下文件就要去手动重新输入 `npm run bulid` 我们需要 `--watch` 的功能，调整下 `package.json`

```JavaScript
  "scripts": {
    "start": "node ./bin/www",
    "build": "webpack --config webpack.config.js",
    "bw": "webpack --config webpack.config.js -w",
  },
```

#### resolve
当我们每次去输入文件路径是肯定会抱怨文件名又臭又长，我们很希望能用短的东西来代替长的东西，没关系 `webpack` 早就想到了。我们只需要把常用到的路径名在其中配置好。

```JavaScript
  resolve: {
    alias: {
      jquery: path.join(__dirname, "./src/js/libs/jquery-2.0.3.min.js"),
      mod: path.join(__dirname, "./src/js/mod"),
      less: path.join(__dirname, "./src/less/")
    }
  },
```

下次用的时候就不需要带上前面的一堆东东了，就可以像我上面写的

```JavaScript
require('less/toast.less')
```

非常便捷

#### plugins

向 `jQuery` 这种经常用到的框架，我不希望我在每个页面不停地去引用它，那有没有好点的方式能让我到处都能用又不去声明引用呢?那就可以在 `webpack` 给你准备的 `plugins`
```JavaScript
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
  ]
```

就可以像我在上面代码那样随意使用 `jQuery`

```javascript
$('body').append(this.$toast)
```

## 组件 `EventHub`

```javascript
var EventHub = (function () {
  var events = {}
  //订阅
  function on(eventName, handler) {
    events[eventName] = events[eventName] || []
    events[eventName].push({
      handler
    })
  }
  //发布
  function emit(eventName, args) {
    if (!events[eventName]) {
      return
    }
    for (let i = 0; i < events[eventName].length; i++) {
      events[eventName][i].handler(args)
    }
  }

  return {
    on,
    emit
  }
})()

module.exports = EventHub
```

使用发布订阅模式

## 组件 `Waterfall`

```javascript
var WaterFall = (function () {
  var $ct
  var $items

  function render($c) {
    $ct = $c
    $items = $ct.children()
    var nodeWidth = $items.outerWidth(true)
    var colNum = parseInt($(window).width() / nodeWidth)
    var colSumHeight = []
    for (let i = 0; i < colNum; i++) {
      colSumHeight.push(0)
    }
    $items.each(function () {
      var $cur = $(this)
      var index = 0
      var minSumHeight = colSumHeight[0]
      for (let i = 0; i < colSumHeight.length; i++) {
        if (colSumHeight[i] < minSumHeight) {
          index = i
          minSumHeight = colSumHeight[i]
        }
      }
      $cur.css({
        left: nodeWidth * index,
        top: minSumHeight
      })
      colSumHeight[index] = $cur.outerHeight(true)
    })
    $(window).on('resize', function(){
      render($ct)
    })
    return {
      init: render
    }
  }
})()

module.exports = WaterFal
```

`js` 实现瀑布流 [原生js实现瀑布流效果](https://segmentfault.com/a/1190000012621936)

## 组件 `Note`

```javascript
require('less/note.less')

var Toast = require('./toast.js').Toast
var EventHub = require('./eventHub')

function Note(opts) {
  this.initOpts(opts)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {
  colors: [
    ['#ea9b35', '#efb04e'], // headColor, containerColor
    ['#dd598b', '#e672a2'],
    ['#eee34b', '#f2eb67'],
    ['#c24226', '#d15a39'],
    ['#c1c341', '#d0d25c'],
    ['#3f78c3', '#5591d2']
  ],

  defaultOpts: {
    id: '',
    $ct: $('#content').length > 0 ? $('#content') : $('body'),
    context: 'have a nice day'
  },

  initOpts(opts) {
    this.opts = $.extend({}, this.defaultOpts, opts || {})
    if (this.opts.id) {
      this.id = this.opts.id
    }
  },

  createNote() {
    let template = `<div class="note">
      <div class = "note-head" > < span class = "username" > < /span><span class="delete">&times;</span > < /div>
      <div class="note-ct" contenteditable="true"></div>
      </div>`
    this.$note = $(template)
    this.$note.find('.note-ct').text(this.opts.context)
    this.$note.find('.username').text(this.opts.username)
    this.$note.$ct.append(this.$note)
    if (!$.id) this.note.css('bottom', '10px')
  },

  setStyle() {
    let color = this.colors[Math.random() * 6]
    this.$note.find('.note-head').css('background-color', color[0])
    this.$note.find('.note-ct').css('background-color', color[1])
  },

  setLayout() {
    if (this.clk) {
      clearTimeout(this.clk)
    }
    this.clk = setTimeout(() => {
      EventHub.emit('waterfall')
    }, 100)
  },

  bindEvent() {
    var $note = this.$note
    var $noteHead = $note.find('.note-head')
    var $noteCt = $note.find('.note-ct')
    var $delete = $note.find('.delete')
    
    $delete.on('click', () => {
      this.delete()
    })

    $noteCt.on('focus', () => {
      if ($noteCt.html() === 'have a nice day') $noteCt.html('')
      $noteCt.data('before', $noteCt.html())
    }).on('blur paste', () => {
      if ($noteCt.data('before') != $noteCt.html()) {
        $noteCt.data('before', $noteCt.html())
        this.setLayout()
        if (this.id) {
          this.edit($noteCt.html())
        } else {
          this.add($noteCt.html())
        }
      }
    })

    $noteHead.on('mousedown', (e) => {
      var evtX = e.pageX - $note.offset().left
      var evtY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos', {
        x: evtX,
        y: evtY
      })
    }).on('mouseup', () => {
      $note.removeClass('draggable').removeData('pos')
    })

    $('body').on('mousemove', (e) => {
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,
        left: e.pageX - $('.draggable').data('evtPos').x
      })
    })
  },

  edit(msg) {
    $.post('/api/notes/edit', {
      id: this.id,
      note: msg
    }).done((ret) => {
      if (ret.status === 0) {
        Toast('update success')
      } else {
        Toast(ret.errorMsg)
      }
    })
  },

  add() {
    console.log('adding...')
    $.post('/api/notes/add', {
        note: msg
      })
      .done((ret) => {
        if (ret.status === 0) {
          Toast('add success')
        } else {
          this.$note.remove()
          EventHub.emit('waterfall')
          Toast(ret.errorMsg)
        }
      })

  },

  delete() {
    $.post('/api/notes/delete', {
        id: this.id
      })
      .done((ret) => {
        if (ret.status === 0) {
          Toast('delete success');
          this.$note.remove()
          EventHub.emit('waterfall')
        } else {
          Toast(ret.errorMsg)
        }
      })
  }
}


module.exports.Note = Note
```

## 组件 `noteManager`

```javascript
let Toast = require('./toast').Toast
let Note = require('./note').Note
let EventHub = require('./eventHub')

let NoteManager = (function () {
  function load() {
    $get('/api/notes').done((ret) => {
        if (ret.status === 0) {
          $.each(ret.data, (index, article) => {
            new Note({
              id: article.id,
              context: article.text,
              username: article.username
            })
          })

          EventHub.emit('waterfall')
        } else {
          Toast(ret.errorMsg)
        }
      })
      .fail(function () {
        Toast('404');
      })
  }

  function add() {
    new Note()
  }

  return {
    load,
    add
  }
})()

module.exports.NoteManager = NoteManager
```



## `note` 增删改查路由

| 操作      | 发送                         | 接收                                       |
| :------ | :------------------------- | :--------------------------------------- |
| 查询/get  | /api/notes                 | {status:0,data:[{},]}{status:1,errorMsg} |
| 增加/post | /api/notes/add  {msg}      | {status:0}{status:1,errorMsg}            |
| 删除/post | /api/notes/delete  {id}    | {status:0}{status:1,errorMsg}            |
| 修改/post | /api/notes/edit  {id, msg} | {status:0}{status:1,errorMsg}            |

```javascript
var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/notes', function(req, res, next) {
  console.log('query...');
});

/* POST listing. */ 
router.post('/notes/add', function(req, res, next) {
  console.log('add...');
});

router.post('/notes/delete', function(req, res, next) {
  console.log('delete...');
});

router.post('/notes/edit', function(req, res, next) {
  console.log('edit...');
});

module.exports = router;
```

## 使用 `sqlite`

`model/note.js`

```javascript
const Sequelize = require('sequelize');
const path = require('path')
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../db/database.sqlite'),
});

const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  }
})

module.exports.Note = Note
```

## 登陆路由

`routes/auth.js`

```JavaScript
var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function (user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log('---deserializeUser---')
  console.log(obj);
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: 'dd06c1133c9ecd1f3953',
    clientSecret: '98de18447c6a0d5031688da283c3317cb6801f94',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

module.exports = router;
```

## 主页路由

`routes/index.js`

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var data;
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user
    }
  } else {
    data = {
      isLogin: false
    }
  }
  console.log(data)
  res.render('index', data);
});

module.exports = router;
```

## 修改请求路由

`routes/api.js`

```javascript
var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/* GET listing. */
router.get('/notes', function (req, res, next) {
  Note.findAll({
    raw: true
  }).then((note) => {
    res.send({
      status: 0,
      data: note
    })
  })
});

/* POST listing. */
router.post('/notes/add', (req, res, next) => {
  if (!req.session.user) {
    return res.send({
      status: 1,
      errorMsg: '请先登录'
    })
  }
  let note = req.body.note
  let username = req.session.user.username
  console.log({
    text: note,
    username: username
  })
  Note.create({
    text: note,
    username
  }).then(() => {
    res.send({
      status: 0
    })
  }).catch(() => {
    res.send({
      status: 1,
      errorMsg: '数据库出错'
    })
  })
});

router.post('/notes/delete', (req, res, next) => {
  if (!req.session.user) {
    return res.send({
      status: 1,
      errorMsg: '请先登录'
    })
  }
  let username = req.session.user.username
  Note.destroy({
    where: {
      id: req.body.id,
      username: username
    }
  }).then(() => {
    res.send({
      status: 0
    })
  }).catch(() => {
    res.send({
      status: 1,
      errorMsg: '数据库错误'
    })
  })
});

router.post('/notes/edit', function (req, res, next) {
  if (!req.session.user) {
    return res.send({
      status: 1,
      errorMsg: '请先登录'
    })
  }
  let body = req.body
  let username = req.session.user.username
  Note.update({
    text: body.note
  }, {
    where: {
      id: body.id,
      username: username
    }
  }).then(() => {
    res.send({
      status: 0
    })
  }).catch(() => {
    res.send({
      errorMsg: '服务器错误'
    })
  })
});

module.exports = router;
```



[TOC]

