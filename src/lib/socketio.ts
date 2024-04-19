import ioClient from 'socket.io-client'
//const ENDPOINT = 'http://localhost:3000'
const ENDPOINT = 'https://dear-code-backend.onrender.com'

const socket = ioClient(ENDPOINT)

export const io = socket;
