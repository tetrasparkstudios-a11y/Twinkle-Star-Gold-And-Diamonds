import { useState, useEffect } from "react";
import { MessageCircle, X, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "918885492229";
const DISPLAY_NUMBER = "+91 8885492229";

interface WhatsAppChatProps {
  hideOnPaths?: string[];
}

export function WhatsAppChat({ hideOnPaths = [] }: WhatsAppChatProps) {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const shouldHide = hideOnPaths.some((path) =>
    location.toLowerCase().includes(path.toLowerCase())
  );

  const getPrefilledMessage = () => {
    const productMatch = location.match(/\/product\/(.+)/);
    if (productMatch) {
      return "Hi TwinkleStar! I'm interested in this product. Please help.";
    }
    return "Hi TwinkleStar! I'm interested in your products. Please help.";
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(getPrefilledMessage());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Track analytics
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "whatsapp_chat_open", {
          page: location,
          productId: location.match(/\/product\/(.+)/)?.[1] || undefined,
        });
      } else if (window.dataLayer) {
        window.dataLayer.push({
          event: "whatsapp_chat_open",
          page: location,
          productId: location.match(/\/product\/(.+)/)?.[1] || undefined,
        });
      }
    }

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      setShowFallback(true);
    }
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(DISPLAY_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (shouldHide) return null;

  return (
    <>
      <div
        className={`
          fixed bottom-6 right-6 z-50
          flex items-center gap-0 group
          ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
          motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4
          motion-reduce:transition-none
        `}
        style={{
          animationDuration: isVisible ? "400ms" : "0ms",
          animationDelay: "100ms",
          animationFillMode: "backwards",
        }}
      >
        <div
          className="
            flex items-center
            opacity-0 translate-x-4
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300 ease-out
            motion-reduce:transition-none
            pointer-events-none
          "
        >
          <span
            className="
              whitespace-nowrap
              bg-card border border-silver
              text-foreground text-sm font-medium
              px-4 py-2.5
              rounded-l-full
              shadow-lg
            "
            data-testid="text-whatsapp-tooltip"
          >
            Need Help? <span className="text-gold">Chat with us</span>
          </span>
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          aria-label="Chat with TwinkleStar on WhatsApp"
          data-testid="button-whatsapp-chat"
          className="
            w-14 h-14 rounded-full
            bg-card border-2 border-silver
            flex items-center justify-center
            shadow-lg
            transition-all duration-300 ease-out
            group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]
            group-hover:scale-110
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background
            motion-reduce:transition-none
            relative z-10
          "
        >
          <MessageCircle className="w-7 h-7 text-gold" strokeWidth={2} />
        </button>
      </div>

      <Dialog open={showFallback} onOpenChange={setShowFallback}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-whatsapp-fallback">
          <DialogHeader>
            <DialogTitle className="text-gold">Contact on WhatsApp</DialogTitle>
            <DialogDescription>
              Open WhatsApp Web or copy this number to chat:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-muted rounded-md text-foreground font-mono text-sm">
                {DISPLAY_NUMBER}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopyNumber}
                data-testid="button-copy-number"
                aria-label="Copy phone number"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-gold" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                className="flex-1"
                variant="default"
                data-testid="button-open-whatsapp-web"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    getPrefilledMessage()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp Web
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                data-testid="button-call-number"
              >
                <a href={`tel:${DISPLAY_NUMBER}`}>
                  <span className="hidden sm:inline">Call</span>
                  <span className="sm:hidden">📞</span>
                </a>
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowFallback(false)}
              className="w-full"
              data-testid="button-close-fallback"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
