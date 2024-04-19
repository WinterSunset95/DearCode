<script lang="ts">

// Imports
import { io } from "$lib/socketio"
import { onMount } from "svelte";

// Server values

// Code

onMount(() => {
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
