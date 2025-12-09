import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { insertProductSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.use(session({
    secret: process.env.SESSION_SECRET || "twinklestar-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  // Initialize default admin if none exists
  const existingAdmin = await storage.getAdminByEmail("admin@twinklestar.com");
  if (!existingAdmin) {
    await storage.createAdmin({
      email: "admin@twinklestar.com",
      password: "TwinkleStar2024!"
    });
  }

  // Admin Authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await storage.getAdminByEmail(email);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.session.adminId = admin.id;
      res.json({ success: true, email: admin.email });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    if (req.session.adminId) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Products API - Public
  app.get("/api/products", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string | undefined,
        metalType: req.query.metalType as string | undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        featured: req.query.featured === "true" ? true : undefined,
        search: req.query.search as string | undefined,
      };
      
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slugOrId", async (req, res) => {
    try {
      const { slugOrId } = req.params;
      let product = await storage.getProductBySlug(slugOrId);
      if (!product) {
        product = await storage.getProductById(slugOrId);
      }
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Products API - Admin Only
  app.post("/api/products", requireAdmin, async (req, res) => {
    try {
      const productData = {
        ...req.body,
        slug: slugify(req.body.name),
      };
      
      const validated = insertProductSchema.parse(productData);
      const product = await storage.createProduct(validated);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const productData = {
        ...req.body,
        slug: req.body.name ? slugify(req.body.name) : undefined,
      };
      
      const product = await storage.updateProduct(id, productData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Reviews API - Public
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await storage.getReviewsByProductId(id);
      
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0;
      
      res.json({
        reviews,
        averageRating: Math.round(avgRating * 10) / 10,
        totalReviews: reviews.length
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:id/reviews", async (req, res) => {
    try {
      const { id } = req.params;
      const { honeypot, ...reviewData } = req.body;
      
      // Anti-spam: honeypot check
      if (honeypot) {
        return res.status(400).json({ error: "Invalid submission" });
      }
      
      // Validate product exists
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const validated = insertReviewSchema.parse({
        ...reviewData,
        productId: id
      });
      
      const review = await storage.createReview(validated);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  // Reviews API - Admin Only
  app.delete("/api/reviews/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteReview(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Review not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  app.patch("/api/reviews/:id/approval", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { isApproved } = req.body;
      
      const review = await storage.updateReviewApproval(id, isApproved);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  // Get all reviews for admin panel
  app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getProducts();
      const allReviews = [];
      
      for (const product of products) {
        const reviews = await storage.getReviewsByProductId(product.id);
        allReviews.push(...reviews.map(r => ({ ...r, productName: product.name })));
      }
      
      allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(allReviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  return httpServer;
}
