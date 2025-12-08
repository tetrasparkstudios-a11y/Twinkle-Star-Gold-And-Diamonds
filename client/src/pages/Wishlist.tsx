import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/lib/ShopContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { products, wishlist } = useShop();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <Layout>
      <div className="bg-card border-b border-white/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-center mb-4">My Wishlist</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Your curated collection of favorite pieces.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start saving your favorite items to build your collection.</p>
            <Link href="/products">
              <Button className="bg-gold text-black hover:bg-gold/90">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
