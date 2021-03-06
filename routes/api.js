var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/* GET listing. */
router.get('/notes', function (req, res, next) {
  var opts = {
    raw: true
  }
  if (req.session && req.session.user) {
    opts.where = {
      username: req.session.user.username
    }
  }

  Note.findAll(opts).then(function (notes) {
    console.log(notes)
    res.send({
      status: 0,
      data: notes
    })
  }).catch(function () {
    res.send({
      status: 1,
      errorMsg: '数据库异常'
    })
  })
})

/* POST listing. */
router.post('/notes/add', (req, res, next) => {
  if (!req.session || !req.session.user) {
    return Note.create({
      text: req.body.note,
      username: '游客'
    }).then(function () {
      console.log(arguments)
      res.send({
        status: 0
      })
    }).catch(function () {
      res.send({
        status: 1,
        errorMsg: '数据库异常或者你没有权限'
      });
    })
  }
  if (!req.body.note) {
    return res.send({
      status: 2,
      errorMsg: '内容不能为空'
    });
  }
  var note = req.body.note;
  var username = req.session.user.username;
  console.log({
    text: note,
    username: username
  })
  Note.create({
    text: note,
    username: username
  }).then(function () {
    console.log(arguments)
    res.send({
      status: 0
    })
  }).catch(function () {
    res.send({
      status: 1,
      errorMsg: '数据库异常或者你没有权限'
    });
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