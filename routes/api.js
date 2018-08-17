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