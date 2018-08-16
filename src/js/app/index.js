var NoteManager = require('mod/noteManager').NoteManager;
var Event = require('mod/eventHub');
var WaterFall = require('mod/waterfall');

NoteManager.load();

$('.add-note').on('click', function () {
  NoteManager.add();
})

Event.on('waterfall', function () {
  WaterFall.init($('#content'));
})