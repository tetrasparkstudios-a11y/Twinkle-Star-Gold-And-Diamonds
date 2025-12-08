import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/lib/ShopContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import heroBg from "@assets/generated_images/luxury_dark_hero_background_with_gold_dust.png";
import { Link } from "wouter";

export default function Home() {
  const { products } = useShop();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Luxury Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 mb-4 border border-gold/30 rounded-full text-xs tracking-[0.3em] text-gold uppercase bg-black/30 backdrop-blur-sm">
                Est. 1995
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white mb-4">
                Timeless <span className="text-gradient-gold">Elegance</span> <br />
                Crafted in Gold
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover our exquisite collection of certified gold and diamond jewelry, designed for those who appreciate the finer things in life.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/products">
                <Button size="lg" className="bg-gold text-black hover:bg-gold-light min-w-[160px] text-base">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 min-w-[160px] text-base">
                  Book Appointment
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side Feature (Mockup of Premium Cost Ratio Box) */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div 
              className="relative bg-black/40 backdrop-blur-xl border border-gold/20 p-8 rounded-lg max-w-md mx-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent rounded-lg blur opacity-20" />
              <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                <Star className="text-gold fill-gold h-5 w-5" />
                Today's Gold Rate
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-muted-foreground">24K Gold (10g)</span>
                  <span className="text-xl font-medium text-gold">₹76,500</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-muted-foreground">22K Gold (10g)</span>
                  <span className="text-xl font-medium text-gold">₹70,150</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-muted-foreground">Silver (1kg)</span>
                  <span className="text-xl font-medium text-white">₹88,000</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Live Market Update</p>
                <span className="inline-flex items-center gap-1.5 text-green-400 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Market Open
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-white/5 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-medium">100% Certified</h3>
              <p className="text-sm text-muted-foreground">BIS Hallmarked Gold & IGI Certified Diamonds</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 border-l border-r border-transparent md:border-white/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-medium">Secure Shipping</h3>
              <p className="text-sm text-muted-foreground">Insured delivery across India with tamper-proof packaging</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-medium">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">Fair making charges and complete price breakdown</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Collections</h2>
            <p className="text-muted-foreground">Explore our diverse range of precious metals and stones</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Gold Jewellery', 'Diamond Solitaires', 'Gold Coins', 'Silver Articles'].map((cat, i) => (
              <div key={i} className="group relative h-80 overflow-hidden rounded-sm cursor-pointer">
                <div className="absolute inset-0 bg-zinc-800 transition-transform duration-700 group-hover:scale-110">
                  {/* Placeholder for category image - using gradient for now if image fails */}
                  <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-zinc-800 to-zinc-900' : 'from-zinc-900 to-black'}`} />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-serif text-white mb-2">{cat}</h3>
                  <span className="inline-flex items-center text-sm text-gold font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold mb-2 block">Handpicked For You</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Best Sellers</h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hover:bg-gold hover:text-black hover:border-gold transition-colors">
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
