<script lang="ts">

// Imports
import ioClient from 'socket.io-client';
import { onMount } from "svelte";

// Server values

// Code

onMount(() => {
	// Check if localhost or render.com
	function checkHost() {
		const host = window.location.host
		if (host.includes('localhost')) {
			return 'http://localhost:3000'
		} else {
			return 'https://dear-code-backend.onrender.com'
		}
	}

	const ENDPOINT = checkHost()
	//const ENDPOINT = 'http://localhost:3000'
	//const ENDPOINT = 'https://dear-code-backend.onrender.com'

	const io = ioClient(ENDPOINT, {
		transports: ['websocket', 'polling', 'flashsocket']
	})

	io.on('message', (message:any) => {
		console.log(message)
	})
})

</script>

<main>
	<h1>This is the code page</h1>
</main>

<style>

main {
	grid-row: 2/12;
	grid-column: 1/13;

	display: flex;
	justify-content: center;
	align-items: center;
}

</style>
