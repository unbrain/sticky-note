let Toast = require('./toast').Toast
let Note = require('./note').Note
let EventHub = require('./eventHub')

let NoteManager = (function () {
  function load() {
    $.get('/api/notes').done((ret) => {
        if (ret.status === 0) {
          $.each(ret.data, (index, article) => {
            let time = new Date()
            new Note({
              id: article.id,
              context: article.text,
              username: article.username,
              time: article.createdAt
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