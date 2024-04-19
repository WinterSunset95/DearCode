<script lang="ts">
// Imports
import { goto } from "$app/navigation";
import { onMount } from "svelte";

// Server data
export let form:{
	status:String, message:String
};

// Code
let loginstate:boolean = false;

$: console.log(loginstate)
onMount(() => {

	let login = window.localStorage.getItem("DearCodeLogin") || "false"
	if (login == "true") {
		loginstate = true;
	} else {
		loginstate = false;
	}

	if (form?.status == "Success"){
		window.localStorage.setItem("DearCodeUser", "Guest");
		window.localStorage.setItem("DearCodeLogin", "false")
		loginstate = false;
	}

})

</script>

<svelte:head>
	<title>Dear Code</title>
</svelte:head>

<main>
	<h1>
		Hello world this is my first svelte page
	</h1>

	{#if loginstate}
		<form method="POST" action="?/logout">
			<input type="submit" value="Logout">
		</form>
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

}

input {
	background-color: var(--buttons);
	color: var(--text);
	padding: 0.5rem;
	border: none;
	cursor: pointer;
}

</style>
