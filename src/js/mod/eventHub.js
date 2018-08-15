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