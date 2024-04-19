<script></script>

<main>
	<h1>Login</h1>
	<form>
		<input type="text" id="username" name="username" placeholder="Username" required>
		<input type="password" id="password" name="password" placeholder="Password" required>
		<input type="submit" value="Login">
		<div>
			Already have an account? <a href="/signup">Sign up</a>
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

</style>
