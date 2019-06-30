onload = function() {
  setVoiceRecognition()
}

// Few patterns for Voice Recognition
const greetings = [
  'Im good you thanks.',
  'Doing great, mate.',
  'Leave me alone!'
]

const weather = [
  'Weather is fine',
  'Its perfect weather for outdoor activity.',
  'Its raining outside.'
]


function setVoiceRecognition() {
  const btn = document.querySelector('#talk')
  const content = document.querySelector('#content')
  
  const SpeechRecoginition = window.SpeechRecoginition || window.webkitSpeechRecognition
  const recognition = new SpeechRecoginition()
  
  recognition.onstart = function() {
    console.log('voice is activated, you can do to your microphone.')
  }
  
  // recognition.onspeechend = function() {} - Another Way to catch an end of voice input
  recognition.onresult = function(event) {
    const current = event.resultIndex

    const transcript = event.results[current][0].transcript
    content.textContent = transcript
    readOutLoud(transcript)
  }
  
  // add the listener to the btn
  btn.addEventListener('click', () => {
    recognition.start()
  })
}

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance()
  speech.volume = 1
  speech.rate = 1
  speech.pitch = 1

  // message to read
  speech.text = 'I dont know what you said.'
  if(message.includes('how are you')) {
    let randomIndex = Math.floor(Math.random() * greetings.length)
    let finalText = greetings[randomIndex]
    speech.text = finalText
  } else if(message.includes('weather')) {
    let randomIndex = Math.floor(Math.random() * weather.length)
    let finalText = weather[randomIndex]
    speech.text = finalText
  }
  
  // run to read
  window.speechSynthesis.speak(speech)
}
