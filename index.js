import { handler } from './build/handler.js'
import express from 'express'

const app = express()
app.use(handler)

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(3000, () => {
	console.log('Server is running')
})
