<script lang="ts">
// Imports
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

// Server values

// Code starts here
let message:String;
let username:String = "";
let password:String = "";
let confirm:String = "";
let loading:Boolean = false;

const submitForm = async () => {
	if (password !== confirm) {
		message = "Passwords do not match";
		return;
	}

	loading = true;
	const reqBody = {
		"username": username,
		"password": password
	}

	const response = await fetch("/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(reqBody)
	});

	const data = await response.json();
	console.log(data)
	if (data.status === "Success") {
		alert(`Signed up as ${username}`)
		goto("/login");
	} else {
		message = data.message;
	}
	loading = false;
}

onMount(() => {
	let login = window.localStorage.getItem("DearCodeLogin") || "false";
	if (login == "true") {
		goto("/");
	}
})

</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<Header />

<main>
	<h1>Sign up</h1>
	<form on:submit|preventDefault={submitForm} >
		{#if message}
			<span class="error">{message}</span>
		{/if}
		<input bind:value={username} type="text" name="username" placeholder="Username" required>
		<input bind:value={password} type="password" name="password" placeholder="Password" required>
		<input bind:value={confirm} type="password" name="confirm" placeholder="Confirm Password" required>
		<input type="submit" value="Sign Up">
		<div>
			Already have an account? <a href="/login">Login</a>
		</div>
	</form>

	{#if loading}
		<div class="loading">
			<div class="circle_thingy"></div>
		</div>
	{/if}
</main>

<Footer />

<style>

main {
	grid-row: 2/12;
	grid-column: 1/13;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	position: relative;
}

.loading {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	background-color: rgba(0,0,0,0.5);

	display: flex;
	justify-content: center;
	align-items: center;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.circle_thingy {
	width: 100px;
	height: 100px;
	border: 5px solid var(--secondary);
	border-top-color: transparent;
	border-bottom-color: transparent;
	animation: spin 1s linear infinite;
	border-radius: 100%;
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
