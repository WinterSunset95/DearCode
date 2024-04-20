import ioClient from 'socket.io-client'

// Check if localhost or render.com
async function checkHost() {
	const host = window.location.host
	if (host.includes('localhost')) {
		return 'http://localhost:3000'
	} else {
		return 'https://dear-code-backend.onrender.com'
	}
}

const ENDPOINT = await checkHost()
//const ENDPOINT = 'http://localhost:3000'
//const ENDPOINT = 'https://dear-code-backend.onrender.com'

const socket = ioClient(ENDPOINT, {
	transports: ['websocket', 'polling', 'flashsocket']
})

export const io = socket;
