'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter()
	const [uname, setUname] = useState("");
	const [password, setPassword] = useState("");

	// Make a POST request to the server
	const handleSubmit = async (e:any) => {
		e?.preventDefault()

		// uname and password must NOT be empty
		if (uname == "" || password == "") {
			alert("Username or password cannot be empty")
			return
		}

		// If it reaches this part of the code, then error handling is complete
		const data = {
			uname: uname,
			pass: password
		}

		const res = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify(data)
		})

		const json = await res.json()
		if (json.status == 'success') {
			localStorage.setItem('DearCodeUname', uname)
			localStorage.setItem('DearCodeStatus', 'true')
			alert("Login successful, press enter")
			router.push("/")
		} else if (json.status == 'error') {
			alert(json.message)
		} else {
			alert("Unknown error occured on the client side")
		}
	}

	return (
		<main className="w-dvw h-dvh flex justify-center items-center">
			<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-6 bg-neutral-800">
				<input value={uname} onChange={(e) => setUname(e.target.value)} className="p-4 bg-transparent border border-white" type="text" placeholder="Username" required></input>
				<input value={password} onChange={(e) => setPassword(e.target.value)} className="p-4 bg-transparent border border-white" type="password" placeholder="Password" required></input>
				<input className="px-4 py-2 bg-white text-black border-none" type="submit" value="Login"></input>
				<div>
					<span>No account? </span>
					<a className="text-blue-800 hover:text-red-800" href="/signup">Signup</a>
				</div>
			</form>
		</main>
	)
}
