import necklaceImg from "@assets/generated_images/gold_necklace_product_shot.png";
import ringImg from "@assets/generated_images/diamond_ring_product_shot.png";
import barImg from "@assets/generated_images/gold_bar_product_shot.png";
import coinImg from "@assets/generated_images/gold_coin_product_shot.png";

export interface Product {
  id: string;
  name: string;
  category: "Gold" | "Diamond" | "Silver" | "Coins" | "Bars";
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  weight: string;
  purity: string;
  description: string;
  specifications?: Record<string, string>;
  shippingInfo?: string;
  tags?: string[];
  gallery?: string[];
  videos?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Heritage Gold Necklace",
    category: "Gold",
    price: 125000,
    originalPrice: 140000,
    image: necklaceImg,
    gallery: [necklaceImg, necklaceImg, necklaceImg], // Using same image for mockup
    videos: [],
    isNew: true,
    weight: "22g",
    purity: "22K",
    description: "A masterpiece of craftsmanship, this heritage gold necklace features intricate detailing inspired by royal courts. Perfect for weddings and special occasions.",
    specifications: {
      "Brand": "Twinkle Star",
      "Collection": "Royal Heritage",
      "Gender": "Women",
      "Occasion": "Wedding"
    },
    shippingInfo: "Free insured shipping across India. Delivery within 5-7 business days. Easy returns within 15 days of delivery for unworn items with original tags.",
    tags: ["Bestseller", "Trending"]
  },
  {
    id: "2",
    name: "Solitaire Diamond Ring",
    category: "Diamond",
    price: 85000,
    image: ringImg,
    isNew: true,
    weight: "4g",
    purity: "18K Gold / VVS1 Diamond",
    description: "An exquisite solitaire diamond ring set in 18K white gold. The symbol of eternal love and sophistication."
  },
  {
    id: "3",
    name: "Swiss Gold Bar 24K",
    category: "Bars",
    price: 65000,
    image: barImg,
    weight: "10g",
    purity: "999.9",
    description: "Investment grade 24K gold bar with Swiss certification. Secure your future with pure gold."
  },
  {
    id: "4",
    name: "Lakshmi Gold Coin",
    category: "Coins",
    price: 32000,
    image: coinImg,
    weight: "5g",
    purity: "24K",
    description: "Beautifully minted 24K gold coin featuring Goddess Lakshmi. Ideal for gifting and auspicious beginnings."
  },
  {
    id: "5",
    name: "Floral Diamond Pendants",
    category: "Diamond",
    price: 45000,
    image: necklaceImg, // Reusing for now
    weight: "3g",
    purity: "18K",
    description: "Delicate floral design encrusted with sparkling diamonds. A perfect everyday luxury."
  },
  {
    id: "6",
    name: "Antique Temple Choker",
    category: "Gold",
    price: 210000,
    image: necklaceImg, // Reusing
    weight: "35g",
    purity: "22K",
    description: "Traditional temple jewellery design with antique finish. Handcrafted by master artisans."
  }
];
