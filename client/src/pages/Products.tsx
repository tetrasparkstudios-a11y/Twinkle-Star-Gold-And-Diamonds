import { Layout } from "@/components/layout/Layout";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Products() {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = ["Gold", "Diamond", "Silver", "Coins", "Bars"];
  const metals = ["24K Gold", "22K Gold", "18K Gold", "Platinum", "Silver"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filter logic (mock)
  const filteredProducts = products.filter(p => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif font-semibold mb-4">Price Range</h3>
        <Slider 
          defaultValue={[0, 500000]} 
          max={500000} 
          step={1000} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="font-serif font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif font-semibold mb-4">Metal Purity</h3>
        <div className="space-y-3">
          {metals.map(metal => (
            <div key={metal} className="flex items-center space-x-2">
              <Checkbox id={`metal-${metal}`} />
              <Label htmlFor={`metal-${metal}`} className="text-sm font-normal cursor-pointer">{metal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif font-semibold mb-4">Occasion</h3>
        <div className="space-y-3">
          {["Wedding", "Daily Wear", "Gifting", "Anniversary", "Office Wear"].map(occ => (
            <div key={occ} className="flex items-center space-x-2">
              <Checkbox id={`occ-${occ}`} />
              <Label htmlFor={`occ-${occ}`} className="text-sm font-normal cursor-pointer">{occ}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-card border-b border-white/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-center mb-4">Our Collection</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Explore our meticulously curated selection of fine jewelry, crafted to perfection for every occasion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
            <FilterSidebar />
          </aside>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="py-6">
                  <h2 className="text-xl font-display font-bold mb-6">Filters</h2>
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
            
            <span className="text-sm text-muted-foreground">{filteredProducts.length} Products</span>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="hidden lg:block text-sm text-muted-foreground">
                Showing {filteredProducts.length} Products
              </span>
              
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button 
                  variant="link" 
                  className="text-gold mt-2"
                  onClick={() => {
                    setPriceRange([0, 500000]);
                    setSelectedCategories([]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
