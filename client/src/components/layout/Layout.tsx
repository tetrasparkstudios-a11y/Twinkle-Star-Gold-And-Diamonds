import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-gold selection:text-black">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
