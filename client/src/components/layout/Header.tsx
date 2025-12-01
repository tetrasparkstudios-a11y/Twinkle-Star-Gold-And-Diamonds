import { Link } from "wouter";
import { Search, ShoppingBag, User, Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Collections", href: "/products?category=collections" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-gold">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r-border">
              <div className="flex flex-col gap-8 mt-10">
                <Link href="/" className="text-2xl font-display font-bold text-gradient-gold">
                  TWINKLE STAR
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-serif text-foreground/80 hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <span className="text-2xl md:text-3xl font-display font-bold text-gradient-gold tracking-wider">
            TWINKLE STAR
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground group-hover:text-gold transition-colors uppercase">
            Gold & Diamonds
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex hover:text-gold hover:bg-transparent">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-gold hover:bg-transparent">
            <User className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="hover:text-gold hover:bg-transparent relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-gold rounded-full animate-pulse" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
