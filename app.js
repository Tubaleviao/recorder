const express = require('express')
const app = express()
const protocol = require('http') // require('https')
const fs = require('fs')
//const cert = () => ({key: fs.readFileSync(process.env.CERT_KEY), cert: fs.readFileSync(process.env.CERT_CERT)})
const server = protocol.createServer(app) // protocol.createServer(cert(), app)
// multer for holding the audio file
const multer  = require('multer')
const upload = multer()

app.get('/', (req, res) => res.render('index.html'))

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
  console.log(req.file);
  let upload_path = __dirname + `/public/mp3/${new Date().getTime()}.mp3`
  fs.writeFileSync(upload_path, Buffer.from(new Uint8Array(req.file.buffer)));
  res.sendStatus(200);
})