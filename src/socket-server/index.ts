import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use(cors())
app.get('/', (req, res) => {
  // do the form input send get request has key message to server
  const baseHTML = `
    <form action="/api/message" method="get">
      <input type="text" name="message" />
      <input type="submit" value="Send" />
    </form>
  `
  res.send(baseHTML)
  res.end()
})

app.get('/api/message', (req, res) => {
  const message = req.query.message
  io.emit('message', { type: 'message', data: message })
  console.log(`message: ${message}`)
  res.redirect('/')
  res.end()
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('message', { type: 'message', data: 'welcome to the chat' })
  socket.on('channel_message', (msg) => {
    console.log(msg)
  })
})

server.listen(3030, () => {
  console.log('listening on http://localhost:3030')
})
