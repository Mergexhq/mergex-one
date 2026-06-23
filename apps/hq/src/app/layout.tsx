import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MergeX HQ - Client Portal",
  description: "MergeX HQ client experience portal",
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
