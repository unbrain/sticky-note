var NoteManager = require('mod/noteManager').NoteManager;
var EventHub = require('mod/eventHub');
var WaterFall = require('mod/waterfall');

NoteManager.load();

$('#addmy').on('click', function () {
  NoteManager.add();
})

EventHub.on('waterfall', function () {
  WaterFall.render($('#content'));
})

document.addEventListener('scroll', () => {
  console.log(1);
  
  if (window.scrollY == 0) {
    $('#header').removeClass('active')
  } else {
    $('#header').addClass('active')
  }
})