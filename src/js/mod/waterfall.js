var WaterFall = (function () {
  var $ct
  var $items

  function render($c) {
    $ct = $c
    $items = $ct.children() || []

    var nodeWidth = $items.outerWidth(true)
    var colNum = parseInt($(window).width() / nodeWidth)
    var colSumHeight = []

    for (let i = 0; i < colNum; i++) {
      colSumHeight.push(0)
    }

    $items.each(function () {
      var $cur = $(this)
      var index = 0
      var minSumHeight = colSumHeight[0]
      for (let i = 0; i < colSumHeight.length; i++) {
        if (colSumHeight[i] < minSumHeight) {
          index = i
          minSumHeight = colSumHeight[i]
        }
      }
      $cur.css({
        left: nodeWidth * index,
        top: minSumHeight
      })
      colSumHeight[index] = $cur.outerHeight(true) + colSumHeight[index]
    })
  }
  $(window).on('resize', function () {
    render($ct)
  })

  return {
    render
  }
})()

module.exports = WaterFall