var NoteManager = require('mod/noteManager').NoteManager;
var EventHub = require('mod/eventHub');
var WaterFall = require('mod/waterfall');

NoteManager.load();

$('.add-note').on('click', function () {
  NoteManager.add();
})

EventHub.on('waterfall', function () {
  WaterFall.render($('#content'));
})