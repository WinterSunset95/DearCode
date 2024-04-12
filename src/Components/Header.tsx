'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./home.module.css"

export default function Header() {
	const uname = localStorage.getItem('DearCodeUname');
	const loggedIn = localStorage.getItem('DearCodeStatus');
	const router = useRouter();

	const [nav, setNav] = useState(false);

	const UserStatus = () => {
		if (uname && loggedIn) {
			return (
				<li className="px-4 transition-all bg-sky-800 hover:bg-sky-900">
					<a href="#">
						{uname}
					</a>
				</li>
			)
		} else {
			return (
				<li className="px-4 transition-all bg-sky-800 hover:bg-sky-900">
					<a href="/login">Login</a>
				</li>
			)
		}
	}

	useEffect(() => {
		if (!uname || !loggedIn) {
			router.push('/login')
		}
	}, []);
	return (
		<section className="w-full col-span-12 row-span-1 p-4 bg-blue-950 flex justify-between items-center">
			<h1 className="text-4xl">
				DearCode
			</h1>
			<ul className={`${nav ? '' : styles.navhidden} transition-all w-dvw h-dvh bg-black fixed top-0 left-0 md:relative md:w-max md:h-full md:bg-transparent   flex flex-col md:flex-row gap-4`}>
				<li className="px-4 flex justify-end items-center md:hidden">
					<div onClick={() => setNav(!nav)} className="transition-all cursor-pointer">
						<svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
						</svg>
					</div>
				</li>
				<li className="px-4 transition-all hover:bg-sky-900">
					<a href="#">Home</a>
				</li>
				<li className="px-4 transition-all hover:bg-sky-900">
					<a href="#">Contact</a>
				</li>
				<li className="px-4 transition-all hover:bg-sky-900">
					<a href="/test">Test</a>
				</li>
				<UserStatus />
			</ul>
			<div onClick={() => setNav(!nav)} className="transition-all cursor-pointer md:hidden">
				<svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
				</svg>
			</div>
		</section>
	)
}
