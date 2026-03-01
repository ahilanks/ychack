import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrialGuard - Free Trial Manager",
  description:
    "Automatically manage free trials, cancel before they expire, and discover which services make cancellation hardest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
