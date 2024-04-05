import type { Metadata } from "next";
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
      <body className="mont_font">{children}</body>
    </html>
  );
}
