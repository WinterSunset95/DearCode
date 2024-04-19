<script lang="ts">
// Imports
import { goto } from '$app/navigation';
import { onMount} from 'svelte';

// Server values
export let form:{
	status:String,
	message:String
};

// Code starts here
let message:String;
let username:String = "";

onMount(() => {
	if (!form) {
		return;
	}

	message = form.message;

	if (form.status == "Success") {
		alert(`Signed up as ${username}`)
		goto("/login")
	}
})

</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<main>
	<h1>Sign up</h1>
	<form method="POST">
		{#if message}
			<span class="error">{message}</span>
		{/if}
		<input bind:value={username} type="text" name="username" placeholder="Username" required>
		<input type="password" name="password" placeholder="Password" required>
		<input type="password" name="confirm" placeholder="Confirm Password" required>
		<input type="submit" value="Sign Up">
		<div>
			Already have an account? <a href="/login">Login</a>
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
