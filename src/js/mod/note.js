require('less/note.less')

var Toast = require('./toast').Toast
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
    context: 'have a nic day'
  },

  initOpts(opts) {
    this.opts = $.extend({}, this.defaultOpts, opts || {})
    if (this.opts.id) {
      this.id = this.opts.id
    }
  },

  createNote() {
    let template = `
    <div class="note">
      <div class="note-head">
        <span class="username">
        </span>
        <span class="delete">&times;
        </span>
      </div>
      <div class="note-ct" contenteditable="true">
      </div>
    </div>`
    this.$note = $(template)
    this.$note.find('.note-ct').text(this.opts.context)
    this.$note.find('.username').text(this.opts.username)
    this.opts.$ct.append(this.$note)
    if (!$.id) this.$note.css('bottom', '10px')
  },

  setStyle() {
    let num0 = Math.floor(Math.random()*6);
    let num1 = Math.floor(Math.random()*6);
    this.$note.find('.note-head').css('background-color', this.colors[num0])
    this.$note.find('.note-ct').css('background-color', this.colors[num1])
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

  add(msg) {
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