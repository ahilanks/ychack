import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotATrial",
  description:
    "You forgot to cancel your free trial, and it just hit your card. Again. NotATrial tracks every free trial you sign up for, reminds you before they renew, and even cancels them for you.",
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
