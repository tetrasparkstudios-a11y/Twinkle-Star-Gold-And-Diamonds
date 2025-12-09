import { Layout } from "@/components/layout/Layout";
import { useShop } from "@/lib/ShopContext";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Truck, ShieldCheck, RefreshCw, Heart, Share2, MessageCircle, Play, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ProductZoom } from "@/components/product/ProductZoom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { products, toggleWishlist, isInWishlist } = useShop();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Media State
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

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

  const isWishlisted = isInWishlist(product.id);
  
  // Combined gallery source
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const videos = product.videos || [];
  const totalMedia = [...images, ...videos];

  const handleMediaSelect = (index: number) => {
    setSelectedMediaIndex(index);
    if (index < images.length) {
      setMediaType('image');
    } else {
      setMediaType('video');
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    setShowLoginModal(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-sm overflow-hidden border border-white/5 relative group bg-white/5">
              {mediaType === 'image' ? (
                <ProductZoom 
                  src={totalMedia[selectedMediaIndex]} 
                  alt={product.name} 
                  className="w-full h-full"
                />
              ) : (
                <video 
                  src={totalMedia[selectedMediaIndex]} 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                />
              )}
              
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className={cn(
                    "rounded-full transition-colors",
                    isWishlisted ? "bg-red-500 text-white hover:bg-red-600" : "hover:bg-red-500 hover:text-white"
                  )}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full hover:text-gold transition-colors">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {totalMedia.map((media, i) => {
                const isVideo = i >= images.length;
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square bg-secondary/20 rounded-sm overflow-hidden cursor-pointer border transition-all duration-200 relative",
                      selectedMediaIndex === i ? "border-gold ring-1 ring-gold/50" : "border-transparent hover:border-gold/50"
                    )}
                    onClick={() => handleMediaSelect(i)}
                  >
                    {isVideo ? (
                      <div className="w-full h-full flex items-center justify-center bg-black/50">
                        <Play className="h-8 w-8 text-white opacity-80" />
                        {/* Assuming video thumbnail is not available, we use a generic placeholder or the video itself muted */}
                        <video src={media} className="absolute inset-0 w-full h-full object-cover opacity-50 -z-10" />
                      </div>
                    ) : (
                      <img src={media} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    )}
                  </div>
                );
              })}
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
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-muted-foreground">{key}</span>
                          <span>{value}</span>
                        </div>
                      ))
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {product.shippingInfo || "Free insured shipping across India. Delivery within 5-7 business days. Easy returns within 15 days of delivery for unworn items with original tags."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewsSection productId={product.id} />
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

interface Review {
  id: number;
  productId: string;
  name: string;
  rating: number;
  title: string | null;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function ReviewsSection({ productId }: { productId: string }) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    title: "",
    comment: "",
    honeypot: "" // spam protection
  });

  const { data, isLoading } = useQuery<ReviewsData>({
    queryKey: ['/api/products', productId, 'reviews'],
  });

  const submitReview = useMutation({
    mutationFn: async (reviewData: typeof formData) => {
      return apiRequest("POST", `/api/products/${productId}/reviews`, reviewData);
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you! Your review will appear after approval.",
      });
      setShowForm(false);
      setFormData({ name: "", rating: 5, title: "", comment: "", honeypot: "" });
      queryClient.invalidateQueries({ queryKey: ['/api/products', productId, 'reviews'] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in your name and review.",
      });
      return;
    }
    submitReview.mutate(formData);
  };

  const averageRating = data?.averageRating || 0;
  const totalReviews = data?.totalReviews || 0;
  const reviews = data?.reviews || [];

  return (
    <div className="border-t border-white/10 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex text-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-5 w-5",
                    i <= Math.round(averageRating) ? "fill-current" : "opacity-30"
                  )} 
                />
              ))}
            </div>
            <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({totalReviews} reviews)</span>
          </div>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-gold text-black hover:bg-gold/90"
          data-testid="button-write-review"
        >
          Write a Review
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8 bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from users */}
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="honeypot">Website</Label>
                <Input 
                  id="honeypot" 
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewName">Your Name</Label>
                  <Input 
                    id="reviewName" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    data-testid="input-review-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1"
                        data-testid={`button-star-${star}`}
                      >
                        <Star 
                          className={cn(
                            "h-6 w-6 transition-colors",
                            star <= formData.rating ? "text-gold fill-gold" : "text-muted-foreground"
                          )} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewTitle">Review Title (Optional)</Label>
                <Input 
                  id="reviewTitle" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Sum up your experience"
                  data-testid="input-review-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewComment">Your Review</Label>
                <Textarea 
                  id="reviewComment" 
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  required
                  data-testid="input-review-comment"
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="bg-gold text-black hover:bg-gold/90"
                  disabled={submitReview.isPending}
                  data-testid="button-submit-review"
                >
                  {submitReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  data-testid="button-cancel-review"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-secondary/20 rounded-md p-6 space-y-3">
              <div className="h-4 bg-secondary/40 rounded w-1/4" />
              <div className="h-3 bg-secondary/40 rounded w-3/4" />
              <div className="h-3 bg-secondary/40 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No reviews yet</p>
          <p className="text-sm">Be the first to share your experience with this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border-b border-white/5 pb-6 last:border-0"
              data-testid={`review-item-${review.id}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-medium">{review.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-3 w-3",
                            i <= review.rating ? "fill-current" : "opacity-30"
                          )} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              {review.title && (
                <h4 className="font-medium mb-2">{review.title}</h4>
              )}
              <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
