<script lang="ts">
// Imports
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import Header from "$lib/Header.svelte";
import Footer from "$lib/Footer.svelte";

// Code
let loginstate:boolean = false;

const logout = async () => {
	window.localStorage.setItem("DearCodeUser", "Guest");
	window.localStorage.setItem("DearCodeLogin", "false");
	alert("Logged out!!");
	goto("/");
}

onMount(() => {

	let login = window.localStorage.getItem("DearCodeLogin") || "false"
	if (login == "true") {
		loginstate = true;
	} else {
		loginstate = false;
	}

})

</script>

<svelte:head>
	<title>Dear Code</title>
</svelte:head>

<Header />

<main>
	<h1>
		Hello world this is my first svelte page
	</h1>

	{#if loginstate}
		<input on:click={logout} type="button" value="Logout" />
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
}

input {
	background-color: var(--buttons);
	color: var(--text);
	padding: 0.5rem;
	border: none;
	cursor: pointer;
}

</style>
