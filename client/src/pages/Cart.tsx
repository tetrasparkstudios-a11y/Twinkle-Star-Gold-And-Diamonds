import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "@/lib/data";
import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";

export default function Cart() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[2], quantity: 2 }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.03; // 3% GST
  const total = subtotal + tax;

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart ({cartItems.length})</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card border border-white/5 rounded-lg">
                  <div className="w-24 h-24 bg-secondary/20 rounded-sm overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.purity} | {item.weight}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-input rounded h-8">
                        <button className="px-2 hover:bg-white/5 h-full">-</button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button className="px-2 hover:bg-white/5 h-full">+</button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">₹{item.price.toLocaleString()} / unit</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 p-3 rounded border border-green-400/20">
                <ShieldCheck className="h-4 w-4" />
                Your order is eligible for free insured shipping and 100% purchase protection.
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-white/5 rounded-lg p-6 sticky top-24">
                <h2 className="font-serif font-bold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (3%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>
                
                <Separator className="mb-4 bg-white/10" />
                
                <div className="flex justify-between font-bold text-xl mb-8">
                  <span>Total</span>
                  <span className="text-gold">₹{total.toLocaleString()}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <Input placeholder="Coupon Code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Button className="w-full bg-gold text-black hover:bg-gold-light h-12 text-lg font-medium mb-4">
                  Proceed to Checkout
                </Button>
                
                <div className="flex justify-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-50 grayscale" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 grayscale" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-50 grayscale" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-dashed border-white/10 rounded-lg">
            <h2 className="text-xl font-serif mb-4">Your cart is empty</h2>
            <Link href="/products">
              <Button className="bg-gold text-black hover:bg-gold-light">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
