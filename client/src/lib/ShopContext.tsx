import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product, products as initialProducts } from "./data";
import { useToast } from "@/hooks/use-toast";

interface ShopContextType {
  products: Product[];
  wishlist: string[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, otherwise use initialProducts
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("shop_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("shop_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("shop_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("shop_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts((prev) => [...prev, product]);
    toast({
      title: "Product Added",
      description: `${product.name} has been added to the catalog.`,
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    toast({
      title: "Product Updated",
      description: "Product details have been updated successfully.",
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from the catalog.",
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <ShopContext.Provider
      value={{
        products,
        wishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
