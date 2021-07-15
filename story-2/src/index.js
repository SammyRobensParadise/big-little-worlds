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
;(function () {
  // Load the script
  var script = document.createElement('SCRIPT')
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js'
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

function mountAudioHandler() {
  var muteCheckbox = $(document.createElement('input')).attr('type', 'checkbox')
  muteCheckbox.attr('checked', false)
  muteCheckbox.attr('name', 'mute-checkbox')
  muteCheckbox.attr('id', 'mute-checkbox')
  muteCheckbox.attr('value', false)
  var muteCheckboxLabel = $(document.createElement('label')).attr(
    'for',
    'mute-checkbox'
  )
  muteCheckboxLabel.text('Mute Audio')
  var muteElement = $(document.createElement('div')).attr('id', 'mute-element')
  muteElement.append(muteCheckbox)
  muteElement.append(muteCheckboxLabel)
  $('div#passages').append(muteElement)
  muteCheckbox.change(function (e) {
    $(this).attr('checked', !$(this).attr('checked'))
    var checked = !!$(this).attr('checked')
    /***
     * If checked then we mute audio
     */
    hideAudioHandler(checked)
  })
}

function hideAudioHandler(state) {
  var audio = $('audio')
  if (state) {
    audio.each(function () {
      this.pause()
      this.currentTime = 0
    })
    audio.hide()
  } else {
    $('audio').show()
  }
}

$(document).ready(function () {
  mountAudioHandler()
  triggerSpaceNavigation()
  triggerShiftNavigation()
  handleReturnToBeginnings()
})
