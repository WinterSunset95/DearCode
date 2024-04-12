import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "DearCode",
  description: "Code online with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className="mont_font">
			{children}
			<div className="-z-50 fixed top-0 left-0 blur-sm opacity-50 w-dvw h-dvh">
				<Image
					src="/dojo.jpg"
					alt="Dojo"
					fill={true}
					style={{ objectFit: "cover" }}
				/>
			</div>
		</body>
		</html>
	);
}
