import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  metalType: string;
  purity: string;
  weight: string;
  price: number;
  originalPrice?: number | null;
  currency: string;
  image: string;
  images?: string[];
  gallery?: string[];
  videos?: string[];
  stockStatus: string;
  shortDescription?: string | null;
  description: string;
  specifications?: Record<string, string> | null;
  shippingInfo?: string | null;
  isFeatured: boolean;
  isNew: boolean;
  tags?: string[];
  festivalOffer?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ShopContextType {
  products: Product[];
  isLoading: boolean;
  wishlist: string[];
  addProduct: (product: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  refetchProducts: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("shop_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shop_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const { data: products = [], isLoading, refetch } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">) => {
      return await apiRequest("POST", "/api/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Added",
        description: "Product has been added to the catalog.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      return await apiRequest("PUT", `/api/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Updated",
        description: "Product details have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Deleted",
        description: "Product has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    },
  });

  const addProduct = async (product: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">) => {
    await addMutation.mutateAsync(product);
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    await updateMutation.mutateAsync({ id, data });
  };

  const deleteProduct = async (id: string) => {
    await deleteMutation.mutateAsync(id);
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
        isLoading,
        wishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleWishlist,
        isInWishlist,
        refetchProducts: refetch,
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
