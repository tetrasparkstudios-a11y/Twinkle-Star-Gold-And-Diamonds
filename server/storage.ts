import { 
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Review, type InsertReview,
  type AdminUser, type InsertAdminUser,
  users, products, reviews, adminUsers
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, gte, lte, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(filters?: {
    category?: string;
    metalType?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    search?: string;
  }): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  getReviewsByProductId(productId: string): Promise<Review[]>;
  getReviewById(id: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  deleteReview(id: string): Promise<boolean>;
  updateReviewApproval(id: string, isApproved: boolean): Promise<Review | undefined>;
  
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(filters?: {
    category?: string;
    metalType?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    search?: string;
  }): Promise<Product[]> {
    let query = db.select().from(products);
    
    const conditions = [];
    
    if (filters?.category) {
      conditions.push(eq(products.category, filters.category));
    }
    if (filters?.metalType) {
      conditions.push(eq(products.metalType, filters.metalType));
    }
    if (filters?.minPrice !== undefined) {
      conditions.push(gte(products.price, filters.minPrice));
    }
    if (filters?.maxPrice !== undefined) {
      conditions.push(lte(products.price, filters.maxPrice));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(products.isFeatured, filters.featured));
    }
    if (filters?.search) {
      conditions.push(ilike(products.name, `%${filters.search}%`));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
    }
    
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
  }

  async getReviewById(id: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [created] = await db.insert(reviews).values(review).returning();
    return created;
  }

  async deleteReview(id: string): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return result.length > 0;
  }

  async updateReviewApproval(id: string, isApproved: boolean): Promise<Review | undefined> {
    const [updated] = await db
      .update(reviews)
      .set({ isApproved })
      .where(eq(reviews.id, id))
      .returning();
    return updated;
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return admin;
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values(admin).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
