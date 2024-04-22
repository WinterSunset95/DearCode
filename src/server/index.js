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
	socket.emit('message', "Hello from the server!")

	socket.on('input', (data) =>{
		io.emit('input', data)
	})

	socket.on('delete', (data) =>{
		io.emit('delete', data)
	})
})

app.use(handler)

server.listen(3000, () => {
	console.log("Running on port 3000")
})
