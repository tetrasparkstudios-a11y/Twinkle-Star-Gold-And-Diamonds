import { Product } from "@/lib/data";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      className="group relative bg-card border border-transparent hover:border-gold/30 transition-all duration-300 rounded-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-secondary/20">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <Button size="icon" variant="secondary" className="rounded-full hover:bg-gold hover:text-black transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button variant="secondary" className="rounded-full hover:bg-white hover:text-black transition-colors font-medium text-xs uppercase tracking-widest px-6">
              View
            </Button>
          </Link>
          <Button size="icon" variant="secondary" className="rounded-full hover:bg-red-500 hover:text-white transition-colors">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 text-center space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
        <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors line-clamp-1">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span className="text-gold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
