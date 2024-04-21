<script lang="ts">
// Imports
import { goto } from '$app/navigation';

// Code starts here
let message:String;
let username:string = ""
let password:string = ""
let loading:boolean = false

const loginUser = async () => {
	loading = true
	const reqBody = {
		"username": username,
		"password": password
	}

	const response = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(reqBody)
	})

	const data = await response.json()

	if (data.status === "Success") {
		window.localStorage.setItem("DearCodeUser", username)
		window.localStorage.setItem("DearCodeLogin", "true")
		alert(`Welcome back, ${username}`)
		goto("/")
	} else {
		message = data.message
	}
	console.log(data)
	loading = false
}

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main>
	<h1>Login</h1>
	<form action="/api/login" on:submit|preventDefault={loginUser}>
		{#if message}
			<span class="error">{message}</span>
		{/if}
		<input bind:value={username} type="text" id="username" name="username" placeholder="Username" required>
		<input bind:value={password} type="password" id="password" name="password" placeholder="Password" required>
		<input type="submit" value="Login">
		<div>
			Don't have an account? <a href="/signup">Sign up</a>
		</div>
	</form>

	{#if loading}
		<div class="loading">
			<div class="circle_thingy"></div>
		</div>
	{/if}
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
