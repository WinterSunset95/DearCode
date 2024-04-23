import { handler } from '../../build/handler.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import { getUsers } from './routes/users.js'
import { initialiseDatabase } from './db/database.js'
import { signupUser } from './routes/signup.js'
import { loginUser } from './routes/login.js'

initialiseDatabase();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = createServer(app)
const io = new Server(server)

// List of online users
let onlineUsers = []

app.get('/healthcheck', (req, res) => {
	res.send('OK')
});

app.get('/api/users', async (req, res) => {
	const result = await getUsers()
	if (result.error) {
		res.status(500).send(result.error)
		console.log(result.error)
	} else {
		res.send(result)
	}
})

app.post('/api/signup', async (req, res) => {
	const result = await signupUser(req, res)
	console.log(result)
})

app.post('/api/login', async (req, res) => {
	const result = await loginUser(req, res)
	console.log(result)
})

io.on('connection', (socket) => {
	console.log("New connection: " + socket.id)
	onlineUsers.push(socket.id)

	socket.emit('new-connection', `Welcome to the server! Your ID is ${socket.id}`)

	socket.on('disconnect', () =>{
		console.log("Disconnected: " + socket.id)
		onlineUsers = onlineUsers.filter((user) => user !== socket.id)
		console.log(onlineUsers)
	})

	socket.on('request-full', (data) => {
		socket.emit('request-full', data)
	})

	socket.on('content-change', (data) => {
		socket.broadcast.emit('content-change', data)
	})

})

app.use(handler)

server.listen(3000, () => {
	console.log("Running on port 3000")
})
