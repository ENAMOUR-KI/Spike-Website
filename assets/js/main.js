(function() {
    "use strict"

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }
})()

function startAudiostream() {
    if (document.getElementById("audio").textContent == "Hey Spike!") {
        document.getElementById("audio").innerHTML = "Bye Spike!"
        console.log("Dummy Audiostream started")
    } else {
        document.getElementById("audio").innerHTML = "Hey Spike!"
        console.log("Dummy Audiostream stopped")
    }
}

function controlSpike(command) {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "https://reqbin.com/echo/post/json")

    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

    xhr.onload = () => console.log(xhr.responseText)

    let data = `{
      "entities": [],
      "intent": {
          "confidence": 1,
          "name": "` + command + `"
      },
      "raw_text": "` + command + `",
      "raw_tokens": [
          "` + command + `"
      ],
      "recognize_seconds": 0.06946082699994349,
      "slots": {},
      "speech_confidence": 1,
      "text": "` + command + `",
      "tokens": [
          "` + command + `"
      ],
      "wakeword_id": null
  }`

    console.log(data)
    xhr.send(data)
}