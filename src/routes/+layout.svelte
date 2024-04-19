<script lang="ts">
// Imports
import Header from "$lib/Header.svelte";
import Footer from "$lib/Footer.svelte";
import "$lib/global.css"
	import {onMount} from "svelte";

// Server data

// Code
let data:{
	username:string | null, loginstate:boolean
} = {
	username: "Guest",
	loginstate: false
}

onMount(() => {
	data.username = window.localStorage.getItem("DearCodeUser") || "Guest"
	let login = window.localStorage.getItem("DearCodeLogin") || false;
	if (login == "true") {
		data.loginstate = true;
	} else {
		data.loginstate = false;
	}
})

</script>

<Header dearCodeUser={data?.username} dearCodeLogin={data?.loginstate} />
<slot />
<Footer />
