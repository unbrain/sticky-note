require('less/note.less')
require('masonry-layout/dist/masonry.pkgd.min')

var Toast = require('./toast').Toast
var EventHub = require('./eventHub')

function Note(opts) {
  this.initOpts(opts)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {
  // colors: [
  //   ['#ea9b35', '#efb04e'], // headColor, containerColor
  //   ['#dd598b', '#e672a2'],
  //   ['#eee34b', '#f2eb67'],
  //   ['#c24226', '#d15a39'],
  //   ['#c1c341', '#d0d25c'],
  //   ['#3f78c3', '#5591d2']
  // ],
  colors: [
    ['#fff', '#fff'], // headColor, containerColor
    ['#fff', '#fff'],
    ['#fff', '#fff'],
    ['#fff', '#fff'],
    ['#fff', '#fff'],
    ['#fff', '#fff']
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
  
    time = this.opts.time ? new Date(this.opts.time) : new Date()
    this.opts.username = this.opts.username ? this.opts.username : '游客'
    this.opts.time = time.toLocaleDateString().replace(/(\w*)(\/)(\w*)(\/)(\w*)/,(m,o,t,th,f,fi)=> `${o}年${th}月${fi}日`)
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 20,
      gutter: 10,
      horizontalOrder: true
    });
  },

  createNote() {
    let template = `
    <div class="note grid-item">
      <div class="note-head">
        <span class="time">
        </span>
        <span class="delete"><i class="grey big remove icon"></i>
        </span>
      </div>
      <div class="ui clearing divider"></div>
      <div class="note-ct" contenteditable="true">
      </div>
      <div class="ui clearing divider"></div>
      <a class="ui label black" >
        <span class="name"></span>
      </a>
    </div>`

    this.$note = $(template)
    this.$note.find('.note-ct').html(this.opts.context)
    this.$note.find('.time').text(this.opts.time)
    this.$note.find('.name').text(this.opts.username)
    $('.grid').append(this.$note).masonry('appended', this.$note)
    // if (!$.id) this.$note.css('bottom', '10px')
  },



  setStyle() {
    let color = this.colors[Math.floor(Math.random() * 6)]
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

  add(msg) {
    $.post('/api/notes/add', {
        note: msg
      })
      .done((ret) => {
        if (ret.status === 0) {
          Toast('add success');

        } else {
          this.$note.remove();
          EventHub.emit('waterfall')
          Toast(ret.errorMsg);
        }
      });

  },

  delete() {
    $.post('/api/notes/delete', {
        id: this.id
      })
      .done((ret) => {
        if (ret.status === 0) {
          Toast('delete success')
          $('.grid').masonry('remove', this.$note)
            // layout remaining item elements
            .masonry('layout')
          EventHub.emit('waterfall')
        } else {
          Toast(ret.errorMsg)
        }
      })
  }
}


module.exports.Note = Note