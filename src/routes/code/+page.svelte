<script lang="ts">

// Imports
import { io } from 'socket.io-client'

// Server values

// Code
let textAreaText = '';
let id:string | undefined;
let socket = io()
//let ENDPOINT:string = 'https://dear-code-backend.onrender.com';

// This is the connection message
socket.on('message', (message:any) => {
	console.log(message)
	id = socket.id;
})

// The different events are as follows:
// - input: On keydown, will send the current value of the text area
// - delete: When the user backspaces, will send the current value of the text area

// On input event, the longer text will take precedence
socket.on('input', (data:string) => {
	if (textAreaText.length < data.length) {
		textAreaText = data;
	}
})

// On delete event, the text from the server will be used
socket.on('delete', (data:string) => {
	textAreaText = data;
})

// This function is specifically for the Tab character.
// We want the site to ignore the Tab key, and instead replace it with a span element
const handleKeydown = (e:KeyboardEvent) => {
	if (e.key == 'Tab') {
		e.preventDefault();
		textAreaText += '<span style="color: red;">Tab</span>'
	}
}

const handleKeyUp = (e:KeyboardEvent) => {
	if (e.key == 'Backspace') {
		socket.emit('delete', textAreaText)
	} else {
		socket.emit('input', textAreaText)
	}
}

</script>

<main>
	<div class="id">
		{#if id}
			<p>Your ID is: {id}</p>
		{:else}
			<p>Connecting...</p>
		{/if}
	</div>
	<div class="inputarea" bind:innerHTML={textAreaText} on:keyup={(e) => handleKeyUp(e)} on:keydown={(e) => handleKeydown(e)} contenteditable></div>
</main>

<style>

main {
	grid-row: 2/12;
	grid-column: 1/13;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.id {
	width: 100%;
	text-align: center;
}

.inputarea {
	flex: 1;
	width: 100%;

	background: transparent;
	color: var(--text);
}

</style>
