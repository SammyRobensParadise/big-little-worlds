/* global $ */

// eslint-disable-next-line no-extra-semi
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
  const SPACE = ' '
  $(window).keypress(function (e) {
    if (e.key === SPACE) {
      var t = $('#space-target').find('a')
      if (t.length) {
        t[0].click()
      }
    }
  })
}

function triggerShiftNavigation() {
  const ENTER = 'Enter'
  $(window).keypress(function (e) {
    if (e.key === ENTER) {
      var t = $('#enter-target').find('a')
      if (t.length) {
        t[0].click()
      }
    }
  })
}

/**
 * mounts element
 */
function mountAudioHandler() {
  window.mute = false
  var muteCheckbox = $(document.createElement('input')).attr('type', 'checkbox')
  muteCheckbox.attr('checked', false)
  muteCheckbox.attr('name', 'mute-checkbox')
  muteCheckbox.attr('id', 'mute-checkbox')
  muteCheckbox.attr('value', false)
  var muteCheckboxLabel = $(document.createElement('label')).attr(
    'for',
    'mute-checkbox'
  )
  muteCheckboxLabel.text('Mute Audio (M key)')
  var muteElement = $(document.createElement('div')).attr('id', 'mute-element')
  muteElement.append(muteCheckbox)
  muteElement.append(muteCheckboxLabel)
  $('div#story').append(muteElement)
  muteCheckbox.change(function () {
    handleCheckboxChange($(this))
  })
}

function mountAudioToggleTip() {
  var toggleTip = $(document.createElement('p'))
  toggleTip.attr('id', 'toggle-tip')
  toggleTip.text('Hint: You can use the P key to play/pause audio')
  $('div#story').append(toggleTip)
}

/**
 *
 * @param {$} target
 */
function handleCheckboxChange(target) {
  target.attr('checked', !target.attr('checked'))
  var checked = !!target.attr('checked')
  window.mute = checked
  if ($.notify) {
    $.notify(window.mute ? '🔇' : '🔊', 'info')
  }

  /***
   * If checked then we mute audio
   */
  hideAudioHandler(checked)
}

/**
 *
 * @param {boolean} state
 */
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

/***
 * handle audio when dom changes
 */
$('div#passages').bind('DOMSubtreeModified', function () {
  if (window.mute === undefined) {
    window.mute = false
  }
  hideAudioHandler(window.mute)
})

function muteAudio() {
  const M = 'm'
  $(window).keypress(function (e) {
    if (e.key === M) {
      window.mute = true
      hideAudioHandler(window.mute)
      handleCheckboxChange($('input[name="mute-checkbox"'))
    }
  })
}

function toggleAudio() {
  const P = 'p'
  $(window).keypress(function (e) {
    if (e.key === P) {
      if (!window.mute) {
        var audio = $('audio')
        audio.each(function () {
          if (!this.paused) {
            this.pause()
          } else {
            this.play()
          }
        })
      } else {
        console.log($.notify)
        if ($.notify) {
          $.notify("Audio disabled. Press 'M' to unmute", 'info')
        } else {
          alert("Audio disabled. Press 'M' to unmute")
        }
      }
    }
  })
}

$(document).ready(function () {
  mountAudioHandler()
  mountAudioToggleTip()
  triggerSpaceNavigation()
  triggerShiftNavigation()
  muteAudio()
  toggleAudio()
})
