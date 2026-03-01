import ConvexClientProvider from "@/components/ConvexClientProvider";
import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </ConvexClientProvider>
  );
}
