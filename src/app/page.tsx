import Image from "next/image";

export default function Home() {
	return (
		<div className="">

			<section className="w-full p-4 bg-blue-950 flex justify-between items-center">
				<h1 className="text-4xl">
					DearCode
				</h1>
				<ul className="w-dvw h-dvh bg-black fixed top-0 left-0 md:relative md:w-max md:h-full md:bg-transparent   flex flex-col md:flex-row gap-4">
					<li className="p-4 transition-all hover:bg-sky-900 hover:scale-125">
						<a href="#">Home</a>
					</li>
					<li className="p-4 transition-all hover:bg-sky-900 hover:scale-125">
						<a href="#">About</a>
					</li>
					<li className="p-4 transition-all hover:bg-sky-900 hover:scale-125">
						<a href="#">Contact</a>
					</li>
					<li className="p-4 transition-all hover:bg-sky-900 hover:scale-125">
						<a href="#">Login</a>
					</li>
					<li className="p-4 transition-all hover:bg-sky-900 hover:scale-125">
						<a href="/test">Test</a>
					</li>
				</ul>
			</section>

			<form className="w-full p-60 flex flex-col justify-center items-center gap-6">
				<h1 className="text-4xl">
					Welcome to DearCode
				</h1>
				<hr className="w-1/2"/>
				<input className="p-4 border border-blue-950 bg-transparent text-white .mont700" type="text" placeholder="Please enter a name to continue"/>
			</form>

		</div>
	);
}
