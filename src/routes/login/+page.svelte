<script lang="ts">
// Imports
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

// Server values
export let form;

// Code starts here
let message:String;
let username:String = ""

onMount(() => {
	// Check if the form was submitted successfully
	if (form?.status == "Success") {
		window.localStorage.setItem("DearCodeUser", form?.user)
		window.localStorage.setItem("DearCodeLogin", "true")
		alert(`Welcome back, ${username}`)
		goto("/")
	} else {
		message = form?.message;
	}

	console.log(message)
})

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main>
	<h1>Login</h1>
	<form method="POST">
		{#if message}
			<span class="error">{message}</span>
		{/if}
		<input bind:value={username} type="text" id="username" name="username" placeholder="Username" required>
		<input type="password" id="password" name="password" placeholder="Password" required>
		<input type="submit" value="Login">
		<div>
			Don't have an account? <a href="/signup">Sign up</a>
		</div>
	</form>
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

form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

input[type="submit"] {
	background-color: var(--buttons);
	color: var(--text);
	padding: 0.5rem;
	border: none;
	cursor: pointer;
}

input {
	padding: 0.5rem;
	border: 1px solid var(--secondary);
}

a {
	color: var(--buttons);
}

.error {
	width: 100%;
	text-align: center;
	color: var(--buttons);
}

</style>
