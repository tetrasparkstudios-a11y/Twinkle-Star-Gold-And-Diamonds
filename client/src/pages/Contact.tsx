import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="bg-card border-b border-white/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Get In Touch</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are here to assist you with your jewelry needs. Visit our showroom or contact us for custom orders and inquiries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground">We typically respond within 24 hours.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Inquiry about Custom Order" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
              </div>
              
              <Button className="w-full bg-gold text-black hover:bg-gold-light h-12 text-lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Info & Map */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <MapPin className="h-8 w-8 text-gold" />
                <h3 className="font-serif font-bold text-lg">Showroom</h3>
                <p className="text-muted-foreground leading-relaxed">
                  123 Luxury Avenue,<br />
                  Gold Souk District,<br />
                  Mumbai, India 400050
                </p>
              </div>
              
              <div className="space-y-4">
                <Phone className="h-8 w-8 text-gold" />
                <h3 className="font-serif font-bold text-lg">Phone</h3>
                <p className="text-muted-foreground">
                  +91 98765 43210<br />
                  +91 22 1234 5678
                </p>
              </div>
              
              <div className="space-y-4">
                <Mail className="h-8 w-8 text-gold" />
                <h3 className="font-serif font-bold text-lg">Email</h3>
                <p className="text-muted-foreground">
                  concierge@twinklestar.com<br />
                  sales@twinklestar.com
                </p>
              </div>

              <div className="space-y-4">
                <Clock className="h-8 w-8 text-gold" />
                <h3 className="font-serif font-bold text-lg">Opening Hours</h3>
                <p className="text-muted-foreground">
                  Mon - Sat: 10:30 AM - 8:30 PM<br />
                  Sun: 11:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-secondary/30 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai&zoom=13&size=600x300&sensor=false')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
              <Button variant="outline" className="relative z-10 bg-background/80 backdrop-blur text-gold border-gold hover:bg-gold hover:text-black">
                View on Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
