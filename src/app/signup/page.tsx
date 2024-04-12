'use client'

import { useRouter } from "next/navigation";
import {useState} from "react"

export default function Signup() {
	const router = useRouter();
	const [uname, setUname] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const handleSubmit = async (e:any) => {
		e?.preventDefault();

		if (password !== confirm) {
			alert("Passwords do not match");
			return;
		}

		const data = {
			uname: uname,
			pass: password
		}

		const res = await fetch("/api/signup", {
			method: "POST",
			body: JSON.stringify(data)
		})

		const json = await res.json();
		if (json.status == 'success') {
			alert("Signed up successfully");
			router.push("/login")
		} else if (json.status == 'error') {
			if (json.message == 'User already exists') {
				alert("User already exists");
				router.push("/login")
			} else {
				alert(json.message);
			}
		} else {
			alert("An error occurred")
		}
	}

	return (
		<main className="w-dvw h-dvh flex justify-center items-center">
			<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 p-6 bg-neutral-800">
				<input value={uname} onChange={(e) => setUname(e.target.value)} name="uname" className="p-4 bg-transparent border border-white" type="text" placeholder="Username"></input>
				<input value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="p-4 bg-transparent border border-white" type="password" placeholder="Password"></input>
				<input value={confirm} onChange={(e) => setConfirm(e.target.value)} name="confirm" className="p-4 bg-transparent border border-white" type="password" placeholder="Confirm password"></input>
				<input className="px-4 py-2 bg-white text-black border-none" type="submit" value="Signup"></input>
			</form>
		</main>
	)
}
