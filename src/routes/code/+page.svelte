<script lang="ts">

// Imports
import CodeHeader from '$lib/CodeHeader.svelte';
import Editor from '$lib/CodeEditor/editor';
import { io } from 'socket.io-client'
import {onMount} from 'svelte';
import type {ContentChangeData} from '$lib/CodeEditor/types';

// Declarations
let id:string | undefined;
let socket = io()
let inputarea:HTMLDivElement;
let editor:Editor;

// This is the connection message
socket.on('new-connection', (message:any) => {
	console.log(message)
	id = socket.id;
})

socket.on('content-change', (data: {id: string | undefined, content: ContentChangeData}) => {
	if (data.id !== id) {
		editor.insertAtPosition(data.content.key, data.content.row, data.content.col)
	}
})

onMount(() => {
	editor = new Editor(inputarea)
	editor.onContentChange((e: ContentChangeData) => {
		const data = {
			id: id,
			content: e
		}
		socket.emit('content-change', data)
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

	<div class="inputarea" bind:this={inputarea}>
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

</style>
