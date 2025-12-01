import { Layout } from "@/components/layout/Layout";
import { products } from "@/lib/data";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Truck, ShieldCheck, RefreshCw, Heart, Share2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-display mb-4">Product Not Found</h1>
          <Button onClick={() => setLocation("/products")}>Back to Products</Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    // Mock add to cart logic
    // Typically would check auth here, but requirement says "Add to cart without login"
    // But checkout requires login.
    // Let's just show a toast (mock)
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Requirement: "Login before buying" logic or at checkout
    setShowLoginModal(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-sm overflow-hidden border border-white/5 relative group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="rounded-full hover:bg-red-500 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full hover:text-gold transition-colors">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-secondary/20 rounded-sm overflow-hidden cursor-pointer border border-transparent hover:border-gold transition-colors">
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-gold text-sm font-bold uppercase tracking-widest">{product.category}</span>
              {product.isNew && <span className="bg-white/10 text-xs px-2 py-0.5 rounded">New Arrival</span>}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 Reviews)</span>
              <span className="text-sm text-muted-foreground border-l border-white/10 pl-4">SKU: TS-{product.id.padStart(4, '0')}</span>
            </div>

            <div className="mb-8 p-6 bg-card border border-white/5 rounded-lg">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl font-bold text-gold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-sm text-green-400 mb-4">Inclusive of all taxes</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Purity</span>
                  <span className="font-medium">{product.purity}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <div className="flex items-center border border-input rounded-md">
                    <button 
                      className="px-3 py-2 hover:bg-white/5 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <span className="flex-1 text-center font-medium">{quantity}</span>
                    <button 
                      className="px-3 py-2 hover:bg-white/5 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                  </div>
                </div>
                <Button className="flex-1 bg-white text-black hover:bg-gray-200" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button className="flex-1 bg-gold text-black hover:bg-gold-light" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-white/5 rounded bg-card/50">
                <ShieldCheck className="h-6 w-6 text-gold mx-auto mb-2" />
                <p className="text-xs font-medium">Certified</p>
              </div>
              <div className="text-center p-4 border border-white/5 rounded bg-card/50">
                <Truck className="h-6 w-6 text-gold mx-auto mb-2" />
                <p className="text-xs font-medium">Insured Shipping</p>
              </div>
              <div className="text-center p-4 border border-white/5 rounded bg-card/50">
                <RefreshCw className="h-6 w-6 text-gold mx-auto mb-2" />
                <p className="text-xs font-medium">Lifetime Exchange</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="desc">
                <AccordionTrigger>Product Description</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {product.description}
                  <br /><br />
                  Crafted with precision and care, this piece exemplifies the legacy of Twinkle Star Gold & Diamonds. Each curve and facet is designed to reflect light and capture attention.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-muted-foreground">Brand</span>
                      <span>Twinkle Star</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-muted-foreground">Collection</span>
                      <span>Royal Heritage</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-muted-foreground">Gender</span>
                      <span>Women</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  Free insured shipping across India. Delivery within 5-7 business days. 
                  Easy returns within 15 days of delivery for unworn items with original tags.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* WhatsApp Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <a href="https://wa.me/" target="_blank" rel="noreferrer">
            <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
              <MessageCircle className="h-6 w-6" />
            </div>
          </a>
        </div>
      </div>

      {/* Login Modal Mock */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-[425px] bg-card border-gold/20">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-2xl text-gold">Welcome Back</DialogTitle>
            <DialogDescription className="text-center">
              Please login to complete your purchase securely.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email / Mobile</Label>
              <Input placeholder="Enter your email or mobile" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full bg-gold text-black hover:bg-gold-light">Login</Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">New here? </span>
              <button className="text-gold hover:underline">Create Account</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
