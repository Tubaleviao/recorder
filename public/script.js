
let bstart = document.querySelector('#start_button')
let bstop = document.querySelector('#stop_button')
let container = document.querySelector('#audio-container')
let format = {'type': 'audio/mp3'} // output audio format
let permissions = { audio: true } // microfone access permission
let recording_time = 3000 // 3000 = 3 seconds

bstart.addEventListener('click', () => {
  bstart.disabled = true
  bstart.innerHTML = "Speak..."
  bstop.disabled = false
  start()
}, false);

let start = () => {
  if (navigator.mediaDevices) { // may need HTTPS connection to exists

    // get permission for microfone access
    navigator.mediaDevices.getUserMedia(permissions).then(stream => { 
      const mediaRecorder = new MediaRecorder(stream)
      let chunks = []

      mediaRecorder.ondataavailable = e => chunks.push(e.data)

      mediaRecorder.onstop = e => {
        // add audio to the page
        var player = document.createElement("audio")
        var blob = new Blob(chunks, format)
        var audioURL = URL.createObjectURL(blob)
        player.src = audioURL
        player.controls = true
        document.body.appendChild(player)
        chunks = []

        // Send audio to server
        let formdata = new FormData()
        formdata.append('soundBlob', blob, 'whatever.wav')
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "upload", true)
        xhr.setRequestHeader('enctype', 'multipart/form-data')
        xhr.send(formdata);
      }

      mediaRecorder.start() // start recording

      // stop button
      bstop.onclick = () => {
        mediaRecorder.stop()
        bstop.disabled = true;
        bstart.disabled = false;
        bstart.innerHTML = "Start"
      }
    });

  } else console.log("Not supported: may need HTTPS connection.");
}