# SmartCart - Simple MERN Price Comparison App

A minimal MERN (MongoDB, Express, React, Node.js) application for comparing product prices across multiple stores and managing a wishlist. **No authentication required.**

## Features

✅ **Browse Products** - View 8 sample tech products with mock data  
✅ **Search** - Filter products by name or description  
✅ **Price Comparison** - Compare prices across 3 stores per product  
✅ **Wishlist** - Add/remove products to a persistent wishlist (MongoDB)  
✅ **Place Order** - Simple mock order creation with confirmation  
✅ **Responsive UI** - Basic CSS styling, mobile-friendly  
✅ **No Authentication** - Demo mode, simple global data  

## Project Structure

```
SmartCart/
├── server/                          # Node + Express backend
│   ├── routes/
│   │   ├── productRoutes.js        # GET /api/products, /api/products/:id
│   │   ├── wishlistRoutes.js       # GET, POST, DELETE wishlist endpoints
│   │   └── orderRoutes.js          # POST /api/orders/create
│   ├── controllers/
│   │   ├── productController.js    # Product search & details logic
│   │   ├── wishlistController.js   # Wishlist CRUD
│   │   └── orderController.js      # Order creation logic
│   ├── models/
│   │   ├── Wishlist.js             # MongoDB wishlist schema
│   │   └── Order.js                # MongoDB order schema
│   ├── data/
│   │   └── mockProducts.json       # 8 products with store prices
│   ├── server.js                   # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── client/                          # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js           # Navigation bar
    │   │   └── ProductCard.js      # Reusable product card
    │   ├── pages/
    │   │   ├── Home.js             # Home with search & product grid
    │   │   ├── ProductPage.js      # Product detail + compare prices
    │   │   ├── WishlistPage.js     # Wishlist display
    │   │   └── OrderPage.js        # Order review & confirmation
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Navbar.css
    │   │   ├── Home.css
    │   │   ├── ProductCard.css
    │   │   ├── ProductPage.css
    │   │   ├── WishlistPage.css
    │   │   └── OrderPage.css
    │   ├── App.js                  # Main app with routing
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Prerequisites

- **Node.js** 16+ (18+ recommended)
- **npm** 8+
- **MongoDB** (local or MongoDB Atlas connection string)

Check versions:
```powershell
node -v
npm -v
```

## Installation

### Backend Setup

```powershell
cd path\to\SmartCart\server
npm install
```

Create `.env` file (copy from `.env.example`):
```
MONGO_URI=mongodb://localhost:27017/smartcart
PORT=5000
```

If using **MongoDB Atlas**, replace MONGO_URI with your connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smartcart?retryWrites=true&w=majority
```

### Frontend Setup

```powershell
cd path\to\SmartCart\client
npm install
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```powershell
cd path\to\SmartCart\server
npm run dev
# Server will start on http://localhost:5000
```

**Terminal 2 - Frontend:**
```powershell
cd path\to\SmartCart\client
npm start
# Frontend will open on http://localhost:3000
```

### Option 2: Production Mode

**Backend:**
```powershell
cd path\to\SmartCart\server
npm start
```

**Frontend:**
```powershell
cd path\to\SmartCart\client
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?search=keyword` - Search products
- `GET /api/products/:id` - Get product by ID

### Wishlist
- `GET /api/wishlist` - Get all wishlist items
- `POST /api/wishlist/add` - Add product to wishlist
  ```json
  { "productId": 1 }
  ```
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist

### Orders
- `POST /api/orders/create` - Create an order
  ```json
  {
    "items": [
      { "productId": 1, "productName": "Product", "store": "Amazon", "price": 79.99 }
    ],
    "total": 79.99
  }
  ```
- `GET /api/orders` - Get all orders

## Usage

1. **Home Page**
   - Browse all 8 sample products
   - Use search bar to filter products

2. **Product Details**
   - Click "View Details" on any product
   - See prices from Amazon, Best Buy, Walmart, etc.
   - Add to wishlist or place an order

3. **Wishlist**
   - View all saved products
   - See total value of wishlist
   - Remove items as needed

4. **Orders**
   - Select a product and store
   - Receive order confirmation with order number
   - Mock data (no real payments)

## Database

### Collections

**Wishlist:**
```json
{
  "_id": ObjectId,
  "productId": 1,
  "productName": "Wireless Headphones",
  "price": 79.99,
  "addedAt": ISODate
}
```

**Orders:**
```json
{
  "_id": ObjectId,
  "items": [{ "productId": 1, "productName": "...", "store": "Amazon", "price": 79.99 }],
  "total": 79.99,
  "orderNumber": "ORD-1699999999999",
  "createdAt": ISODate
}
```

## Mock Data

The `mockProducts.json` file contains 8 products:
1. Wireless Headphones
2. USB-C Charging Cable
3. Portable SSD 1TB
4. Mechanical Keyboard
5. 4K Webcam
6. Laptop Stand
7. Mouse Pad XL
8. USB Hub 7-Port

Each product has prices from 3 different stores.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally: `mongod`
- Or provide a valid MongoDB Atlas connection string in `.env`

### Port Already in Use
- Backend default: 5000 (change in `.env` PORT)
- Frontend default: 3000 (react-scripts will prompt if busy)

### CORS Errors
- Backend enables CORS for all origins (default)
- Frontend runs on localhost:3000 connecting to localhost:5000

### Wishlist/Orders Not Persisting
- Ensure MongoDB is connected
- Check `.env` MONGO_URI is correct
- Check server console for connection messages

## Development

### Add a New Product
Edit `server/data/mockProducts.json` and add to the array:
```json
{
  "id": 9,
  "name": "Your Product",
  "description": "...",
  "image": "url",
  "storePrices": [
    { "store": "Amazon", "price": 99.99, "link": "..." },
    { "store": "Best Buy", "price": 109.99, "link": "..." },
    { "store": "Walmart", "price": 89.99, "link": "..." }
  ]
}
```

### Customize Styles
All CSS files are in `client/src/styles/` — modify as needed (no CSS-in-JS, no Tailwind).

## Build for Production

**Frontend:**
```powershell
cd client
npm run build
# Creates optimized build in client/build/
```

**Backend:**
No build needed; run with `npm start`

## License

MIT

## Notes

- **No Authentication**: This is a demo app with a global wishlist
- **Mock Data Only**: All product data comes from JSON, not a real database
- **No Payments**: Order creation is mock (no Stripe, PayPal integration)
- **Simple CSS**: Basic styling with plain CSS, no frameworks like Tailwind

## Support

For issues or questions, check the troubleshooting section or review server/client console logs.
