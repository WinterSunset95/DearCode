<script>
let userName = "Guest"
let loginState = false
</script>

<nav>
	<h1>{userName}</h1>

	<ul>
		<li><a href="#">About</a></li>
		<li><a href="#">Contacts</a></li>
		<li><a href="#">Code</a></li>
		{#if loginState}
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
