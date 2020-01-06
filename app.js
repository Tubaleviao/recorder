const express = require('express')
const app = express()
// with HTTPS:
// const protocol = require('https')
// const cert = () => ({key: fs.readFileSync(process.env.CERT_KEY), cert: fs.readFileSync(process.env.CERT_CERT)})
// const server = protocol.createServer(cert(), app)
// without HTTPS:
const protocol = require('http')
const server = protocol.createServer(app)
// multer for holding the audio file
const multer  = require('multer')
const upload = multer()
const fs = require('fs')

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
  //console.log(req.file);
  let upload_path = __dirname + `/public/mp3/${new Date().getTime()}.mp3`
  fs.writeFileSync(upload_path, Buffer.from(new Uint8Array(req.file.buffer)));
  res.sendStatus(200);
})

server.listen(3000, () => console.log(`Port 3000!`))