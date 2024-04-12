'use client'

import Header from "@/Components/Header"

export default function Code() {

	const handleInput = (e:any) => {
		if (e.key == "Tab") {
			e.preventDefault()
			e.target.innerHTML = e.target.innerHTML + "    "
		}
	}

	return (
		<div className="w-dvw h-dvh overflow-scroll grid grid-rows-12 grid-cols-12">

			<Header />

			<div onKeyDown={(e) => handleInput(e)} className="col-start-auto row-start-auto col-span-12 row-span-11 bg-transparent overflow-scroll" contentEditable>
				<span className="text-red-900">Wally</span> is a programmer.
			</div>
		</div>
	)
}
