<script lang="ts">
import {onMount} from "svelte";

// Imports

// Props
let dearCodeUser:string | null = "Guest";
let dearCodeLogin = false;

// Code starts here
onMount(() => {
	let user = window.localStorage.getItem("DearCodeUser") || "Guest";
	let login = window.localStorage.getItem("DearCodeLogin") || "false";
	if (login == "true") {
		dearCodeLogin = true;
	} else {
		dearCodeLogin = false;
	}
	dearCodeUser = user;
})

</script>

<nav>
	<h1><a href="/">{dearCodeUser}</a></h1>

	<ul>
		<li><a href="#">About</a></li>
		<li><a href="#">Contacts</a></li>
		<li><a href="/code">Code</a></li>
		{#if dearCodeLogin}
			<li><a href="/dashboard">Dashboard</a></li>
		{:else}
			<li><a href="/login">Login</a></li>
			
		{/if}
	</ul>
</nav>

<style>
nav {
	grid-row: 1/2;
	grid-column: 1/13;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background-color: var(--secondary);
	flex-wrap: wrap;
	gap: 1rem;
}

nav > ul {
	display: flex;
	gap: 1rem;
	flex-direction: row;
}

</style>
