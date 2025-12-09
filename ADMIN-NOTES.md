# TwinkleStar Admin Guide

## Admin Login Credentials

- **Email:** admin@twinklestar.com
- **Password:** TwinkleStar2024!

## Accessing the Admin Panel

Navigate to `/admin` in your browser to access the admin dashboard.

## Managing Products

### Adding a New Product
1. Click the "Add Product" button in the admin dashboard
2. Fill in the required fields:
   - **Product Name** - The display name of the product
   - **Category** - Gold, Diamond, Silver, Coins, or Bars
   - **Price** - Current selling price in INR
   - **Original Price** - Optional, for showing discounts
   - **Weight** - e.g., "10 grams", "5.5g"
   - **Purity** - e.g., "22K", "24K", "916"
   - **Description** - Detailed product description
3. Optional fields:
   - **Gallery Images** - Add multiple product image URLs
   - **Videos** - Add product video URLs
   - **Tags** - Add searchable tags like "Bestseller", "Trending"
   - **Specifications** - Add custom key-value pairs
   - **Mark as New Arrival** - Highlights the product
4. Click "Add Product" to save

### Editing Products
1. Find the product in the table
2. Click the pencil icon to edit
3. Make your changes and save

### Deleting Products
1. Find the product in the table
2. Click the trash icon
3. Confirm the deletion

## Customer Reviews

### How Reviews Work
- Customers can submit reviews on any product page
- Reviews include a rating (1-5 stars), optional title, and comment
- **Reviews require approval** before appearing publicly
- A honeypot field helps prevent spam submissions

### Moderating Reviews
Reviews can be managed through the API:
- All reviews submitted are stored in the database
- Reviews have an `isApproved` field that defaults to `false`
- Only approved reviews are shown to customers

## Database

The application uses PostgreSQL for data storage. Key tables:
- `products` - All product information
- `reviews` - Customer reviews with approval status
- `admin_users` - Admin login credentials

## API Endpoints

### Public Endpoints
- `GET /api/products` - List products with optional filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/reviews` - Get approved reviews for a product
- `POST /api/products/:id/reviews` - Submit a review

### Admin Endpoints (require authentication)
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/session` - Check auth status
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/admin/reviews` - Get all reviews (for moderation)
- `DELETE /api/reviews/:id` - Delete a review

## Tips

1. **Product Images**: Use high-quality images with a consistent aspect ratio (square works best)
2. **SEO**: Add relevant tags to products to improve searchability
3. **Pricing**: Always include the original price if there's a discount
4. **Reviews**: Regularly check and approve genuine customer reviews
