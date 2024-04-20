import { handler } from '../../build/handler.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express()
app.use(handler)

const server = createServer(app)
const io = new Server(server)

app.get('/healthcheck', (req, res) => {
	res.send('OK')
});

io.on('connection', (socket) => {
	console.log("New connection: " + socket.id)
	socket.emit('message', "Hello from the server!")
})

server.listen(3000, () => {
	console.log("Running on port 3000")
})
