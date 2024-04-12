'use client'
import Header from "@/Components/Header";

export default function Home() {

	return (
		<div className="">

			<Header />

			<form className="w-full p-60 flex flex-col justify-center items-center gap-6">
				<h1 className="text-4xl">
					Welcome to DearCode
				</h1>
				<hr className="w-1/2"/>
				<input className="p-4 border border-white bg-transparent text-white .mont700" type="text" placeholder="Please enter a name to continue"/>
			</form>

		</div>
	);
}
