import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/lib/ShopContext";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="bg-card border-b border-white/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Button onClick={handleAddNew} className="bg-gold text-black hover:bg-gold/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10 max-w-md bg-secondary/20 border-white/10" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-white/10 overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="h-12 w-12 rounded bg-secondary/20 overflow-hidden">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {product.isNew ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold">
                        New Arrival
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">Standard</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ProductDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        product={editingProduct} 
      />
    </Layout>
  );
}

function ProductDialog({ 
  open, 
  onOpenChange, 
  product 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  product: Product | null; 
}) {
  const { addProduct, updateProduct } = useShop();
  
  // Form handling simple state for mockup
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData: any = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      originalPrice: formData.get("originalPrice") ? Number(formData.get("originalPrice")) : undefined,
      description: formData.get("description"),
      weight: formData.get("weight"),
      purity: formData.get("purity"),
      image: product?.image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", // Placeholder for new images
      isNew: formData.get("isNew") === "on",
    };

    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" defaultValue={product?.name} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={product?.category || "Gold"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Coins">Coins</SelectItem>
                  <SelectItem value="Bars">Bars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" name="price" type="number" defaultValue={product?.price} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input id="originalPrice" name="originalPrice" type="number" defaultValue={product?.originalPrice} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" name="weight" defaultValue={product?.weight} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purity">Purity</Label>
              <Input id="purity" name="purity" defaultValue={product?.purity} required />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={product?.description} required />
            </div>
            
            <div className="flex items-center space-x-2 col-span-2">
              <div className="flex items-center space-x-2">
                 <input 
                  type="checkbox" 
                  id="isNew" 
                  name="isNew" 
                  defaultChecked={product?.isNew}
                  className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                />
                <Label htmlFor="isNew" className="cursor-pointer">Mark as New Arrival</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-gold text-black hover:bg-gold/90">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
