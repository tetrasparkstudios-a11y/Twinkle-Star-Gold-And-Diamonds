import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-gold/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-gradient-gold mb-2">TWINKLE STAR</h3>
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Gold & Diamonds</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting timeless elegance since 1995. We offer the finest certified gold and diamond jewelry for those who appreciate true luxury.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full hover:border-gold hover:text-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:border-gold hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:border-gold hover:text-gold transition-colors">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Collections", "Gold Rate Today", "Store Locator", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                <span>123 Luxury Avenue, Gold Souk District,<br />Mumbai, India 400050</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <span>concierge@twinklestar.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to receive updates on new collections and special offers.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Your Email Address" 
                className="bg-background/50 border-border focus:border-gold transition-colors"
              />
              <Button className="w-full bg-gold text-black hover:bg-gold-light font-medium">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Twinkle Star Gold & Diamonds. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              BIS Hallmarked
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              IGI Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
