import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MergeX OS - Operating System",
  description: "Internal operations, Sales OS, Finance OS, and People OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
