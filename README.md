# product-management

E-Commerce Express Application with TypeScript and MongoDB
Project Overview
This project aims to develop an Express application using TypeScript, integrating MongoDB with Mongoose for effective data management. Data integrity is ensured through validation using Joi or Zod.

Objectives
Set up an Express project with TypeScript.
Integrate MongoDB using Mongoose to store user and order data.
Define Mongoose models for product data with appropriate data types and validations.
Implement CRUD operations for product management.
Implement order management and ensure inventory updates.
Validate incoming data for product and order creation using Joi/Zod.

API Endpoints
1.Product Management
Create a New Product

Endpoint: /api/products

Method: POST

2. Retrieve a List of All Products

Endpoint: /api/products

Method: GET

3.Retrieve a Specific Product by ID

Endpoint: /api/products/:productId

Method: GET

4.Update Product Information

Endpoint: /api/products/:productId

Method: PUT

5.Delete a Product

Endpoint: /api/products/:productId

Method: DELETE

6.Search a Product

Endpoint: /api/products?searchTerm=iphone

Method: GET
