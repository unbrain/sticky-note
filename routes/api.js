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
  console.log(1);

  let note = req.body.note
  Note.create({
    text: note
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
  console.log('add...', note);

});

router.post('/notes/delete', function (req, res, next) {
  Note.destroy({
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.send({
      status: 0
    })
  }).catch(() => {
    sres.send({
      status: 1,
      error: '数据库错误'
    })
  })
});

router.post('/notes/edit', function (req, res, next) {
  let body = req.body
  Note.update({
    text: body.note
  }, {
    where: {
      id: body.id
    }
  }).then(() => {
    console.log(arguments)
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