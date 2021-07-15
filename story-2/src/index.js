;(function () {
  // Load the script
  var script = document.createElement('SCRIPT')
  script.src =
    'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
  script.type = 'text/javascript'
  script.onload = function () {
    window.$ = window.jQuery
  }
  document.getElementsByTagName('head')[0].appendChild(script)
})()

function triggerSpaceNavigation() {
  const SPACE = 32
  $(window).keypress(function (e) {
    if (e.keyCode === SPACE) {
      var t = $('#space-target').find('a')
      if (t.length) {
        t[0].click()
      }
    }
  })
}

function triggerShiftNavigation() {
  const ENTER = 13
  $(window).keypress(function (e) {
    console.log(e.keyCode)
    if (e.keyCode === ENTER) {
      var t = $('#enter-target').find('a')
      if (t.length) {
        t[0].click()
      }
    }
  })
}

function handleReturnToBeginnings() {
  const ESC = 27
  $(window).keypress(function (e) {
    if (e.keyCode === ESC) {
      Engine.restart()
    }
  })
}

$(document).ready(function () {
  triggerSpaceNavigation()
  triggerShiftNavigation()
  handleReturnToBeginnings()
})