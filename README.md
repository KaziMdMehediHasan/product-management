# E-commerce Product Management Backend

**E-Commerce Express Application with TypeScript and MongoDB**

## Project Overview

**This is a backend server for an e-commerce product management system. It is built using TypeScript, Node.js, Express, Mongoose, and MongoDB. Validation is performed with Zod.**

## Features:

- <strong>Create Product:</strong> Use the <em>api/products</em> endpoint to create a new product.
- <strong>Get Product by ID:</strong> Use the <em>api/products/:id</em> endpoint to retrieve a product by its ID.
- <strong>Fetch all Products:</strong> Use the <em>api/products</em> endpoint to retrieve all products available.
- <strong>Delete Product by ID:<strong> Use the api/products/:id endpoint to delete a product by its ID.
- <strong>Search Products:</strong> Use the <em>api/products?searchTerm=searchKeyword</em> endpoint to search for products using a search term.
- <strong>Create Order:</strong> Use the <em>api/orders</em> endpoint to create a new product.
- <strong>Fetch all orders:</strong> Use the <em>api/orders</em> endpoint to retrieve all orders.
- <strong>Search order for a user:</strong> Use the <em>api/orders?email=userEmail</em> endpoint to search for products using a search term.

## How to run this project?

### Installation

1. \*\* Clone the repository:

```bash
git clone https://github.com/KaziMdMehediHasan/product-management
cd ecommerce-product-management
```

2. \*\* Install dependencies:

```bash
npm install
```

3. \*\* Environment Variables:

Create a <strong>.env</strong> file in the root directory of the project and add the following environment variables:

```makefile
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. \*\* Start the server:

```bash
npm run start:dev
```

The server will start on http://localhost:5000.

## API Endpoints

### Create a new product

- Endpoint: `/api/products`

* Method: POST

* Sample Request Body:

```json
{
  "name": "Samsung Galaxy S21",
  "description": "High-performance Android smartphone with advanced camera capabilities.",
  "price": 799,
  "category": "Electronics",
  "tags": ["smartphone", "Samsung", "Android"],
  "variants": [
    {
      "type": "Color",
      "value": "Phantom Black"
    },
    {
      "type": "Storage Capacity",
      "value": "128GB"
    }
  ],
  "inventory": {
    "quantity": 29,
    "inStock": true
  }
}
```

### Get a Product by ID

- Endpoint: `/api/products/:id`

* Method: GET

### Delete a Product by ID

- Endpoint: `/api/products/:id`
- Method: DELETE

### Search Products

- Endpoint: `/api/products?searchTerm=searchKeyword`
- Method: GET

### Create a new order

- Endpoint: `/api/orders`
- Method: POST

* Sample Request Body:

```json
{
  "email": "average_dev@programming-hero.com",
  "productId": "664e1210c34873fba7ec0804",
  "price": 299,
  "quantity": 4
}
```

### Find an order using user email

- Endpoint: `/api/orders?email=userEmail`
- Method: GET
