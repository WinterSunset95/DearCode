<script lang="ts">

// Imports
import CodeHeader from '$lib/CodeHeader.svelte';
import CaretCharacter from '$lib/CaretCharacter.svelte';
import { io } from 'socket.io-client'
import {onMount} from 'svelte';

// Declarations
let id:string | undefined;
let socket = io()
let inputarea:HTMLDivElement;
let row = 1;
let col = 0;
let currLine:HTMLDivElement;
let currInput:Element;
let cursor:HTMLDivElement;

// This is the connection message
socket.on('message', (message:any) => {
	console.log(message)
	id = socket.id;
})

// The different events are as follows:
// - input: On keydown, will send the current value of the text area
// - delete: When the user backspaces, will send the current value of the text area
// The data model of a packet is as follows:
type CodeDataPacket = {
	pos: {
		row: number,
		col: number,
	},
	sender:string | undefined,
	receiver:string,
	key:string,
	fullData: string,
}

let dataPacket:CodeDataPacket = {
	pos: {
		row: row,
		col: col,
	},
	sender: id,
	receiver: 'server',
	key: 'input',
	fullData: '',
}

// Recieve and parse the data packet from the server
socket.on('input', (serverData:CodeDataPacket) => {
	if (serverData.sender != id && inputarea) {
		inputarea.innerHTML = serverData.fullData;

		// Lets calculate where the reciever's cursor should be
		let lines = inputarea.children;
		let line = lines[serverData.pos.row - 1];
		let input = line.children[1];
		currInput = input;

		//let senderRow = serverData.pos.row;
		//let senderCol = serverData.pos.col;
		//// Based on the row and column, we need to find the correct div
		//let lines = inputarea.children;
		//let line = lines[senderRow - 1];
		//let input = line.children[1];
		//// This becomes the currInput
		//currInput = input;
		//// The row and col are updated
		//row = senderRow;
		//col = senderCol;

	}
})

// The sender function will send the data packet to the server
const sendToServer = (key:KeyboardEvent) => {
	dataPacket.sender = id;
	dataPacket.key = key.key;
	dataPacket.pos.row = row;
	dataPacket.pos.col = col;
	dataPacket.fullData = inputarea.innerHTML;
	socket.emit('input', dataPacket);
}


// Keycodes
// 13: Enter
// 8: Backspace
// 32: Space
// 37: Left
// 38: Up
// 39: Right
// 40: Down
// 46: Delete
// 9: Tab
// 16: Shift
// 17: Ctrl
// 18: Alt
// 20: Caps Lock
// 91: Windows
// a: 65
// z: 90
const makeNewLine = () => {
	currLine = document.createElement('div');
	currLine.style.display = 'flex';
	currLine.innerHTML = `<div class="line_num" style="width: 2rem; padding: 0 0.5rem; border-right: 1px solid var(--text); margin-right: 0.25rem;">${row}</div>`;

	currInput = document.createElement('div');
	currLine.style.fontFamily = 'monospace';
	currLine.style.fontSize = '12px';
	currInput.style.fontFamily = 'monospace';
	currInput.style.fontSize = '12px';

	currLine.appendChild(currInput);
	inputarea.appendChild(currLine);

	cursor.style.left = '62px';
	cursor.style.top = `${currInput.getBoundingClientRect().y}px`;
}

const goToLine = (row:number) => {
	// Get all the lines
	let lines = inputarea.children;
	// Check if the row is valid
	if (row > lines.length) {
		console.error('Invalid row')
		return;
	}
	// Get the line
	let line = lines[row - 1];
	// Get the input
	let input = line.children[1];
	// Set the currInput
	currInput = input;
}

onMount(() => {
	// First lets make the first line
	makeNewLine();

	// Lets handle input shall we
	inputarea.addEventListener('click', (e) => {
		if (virtualKeyboard in navigator) {
			alert('Virtual Keyboard is supported');
		} else {
			alert('Virtual Keyboard is not supported');
		}
	})

	// Bring out virtual keyboard on 'touch'
	inputarea.addEventListener('touchend', (e) => {
	})

	inputarea.addEventListener('keydown', (e) => {

		let key = e.key;
		let keyCode = e.keyCode;

		if (key == 'Tab') {
			e.preventDefault();
			currInput.innerHTML += '&emsp;&emsp;&emsp;&emsp;';
		}

		if (key == 'Enter') {
			row += 1;
			col = 0;
			makeNewLine();
		} else if (keyCode >= 65 && keyCode <= 90) {
			// Based on col, we need to insert the character
			currInput.innerHTML = currInput.innerHTML.slice(0, col) + key + currInput.innerHTML.slice(col);
			col += 1;
		} else if (key == 'Backspace') {
			col -= 1;
			currInput.innerHTML = currInput.innerHTML.slice(0, -1);
		} else if (keyCode == 37) {
			// Left
			// If the cursor is at the beginning of the line, then we need to move to the previous line, if it exists
			if (col == 0) {
				if (row > 1) {
					row -= 1;
					goToLine(row);
					col = currInput.innerHTML.length;
				}
			} else {
				col -= 1;
			}
		} else if (keyCode == 39) {
			// Right
			// If the cursor is at the end of the line, then we need to move to the next line, if it exists
			if (col == currInput.innerHTML.length) {
				// If there is a next line
				if (row < inputarea.children.length) {
					row += 1;
					goToLine(row);
					col = 0;
				} else {
					row += 1;
					makeNewLine();
					col = 0;
				}
			} else {
				col += 1;
			}
		} else if (keyCode == 46) {
			// Delete
			currInput.innerHTML = currInput.innerHTML.slice(0, -1);
		} else if (keyCode == 32) {
			// Space
			currInput.innerHTML = currInput.innerHTML.slice(0, col) + ' ' + currInput.innerHTML.slice(col)
			col += 1;
		} else {
		}

		// y position of currInput
		let y = currInput.getBoundingClientRect().y;
		// With the font being montserrat, the width of one character is 1em
		// calculate x position based on col
		let x = col * 7.20;
		// set the cursor position
		cursor.style.top = `${y}px`;
		cursor.style.left = `${x + 62.5}px`;

		sendToServer(e);

	})
})

</script>

<svelte:head>
	<title>Code Live</title>
</svelte:head>

<CodeHeader />

<main>
	<div class="id">
		{#if id}
			<p>Your ID is: {id}</p>
		{:else}
			<p>Connecting...</p>
		{/if}
	</div>

	<div class="cursor_container">
		<div bind:this={cursor} class="cursor"></div>
	</div>

	<div class="inputarea" bind:this={inputarea} tabindex="0">
	</div>

</main>

<style>

main {
	grid-row: 2/13;
	grid-column: 1/13;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
}

.id {
	width: 100%;
	text-align: center;
	padding: 0.5rem 0;
}

.inputarea {
	flex: 1;
	width: 100%;

	background: transparent;
	color: var(--text);
	outline: 1px solid var(--text);

	display: flex;
	flex-direction: column;
	overflow-y: scroll;
}

@keyframes blink {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.cursor_container {
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
}

.cursor {
	position: absolute;
	width: 2px;
	height: 1rem;
	background-color: var(--buttons);
	animation: blink 1s step-end infinite;
}

</style>
