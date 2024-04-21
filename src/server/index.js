import { handler } from '../../build/handler.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import * as db from './db/database.js'

const app = express()

const server = createServer(app)
const io = new Server(server)

app.get('/healthcheck', (req, res) => {
	res.send('OK')
});

app.get('/api/users', async (req, res) => {
	try {
		const result = await db.query('select * from users')
		res.send(result)
	} catch {
		res.send("Users not found")
	}
})

app.use(handler)

io.on('connection', (socket) => {
	console.log("New connection: " + socket.id)
	socket.emit('message', "Hello from the server!")
	socket.on('input', (data) =>{
		io.emit('input', data)
	})
	socket.on('delete', (data) =>{
		io.emit('delete', data)
	})
})

server.listen(3000, () => {
	console.log("Running on port 3000")
})
