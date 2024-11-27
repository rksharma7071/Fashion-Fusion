# Firebase Firestore E-commerce Application

This repository contains the schema and implementation details for a scalable e-commerce application using **Firebase Firestore** as the backend database. The architecture supports collections for managing users, products, orders, categories, reviews, and shopping carts. 

---

## Table of Contents
1. [Firestore Collections and Documents](#firestore-collections-and-documents)
   - [Users](#users)
   - [Products](#products)
   - [Categories](#categories)
   - [Orders](#orders)
   - [Reviews](#reviews)
   - [Cart](#cart)
2. [Firestore Security Rules](#firestore-security-rules)
3. [Additional Considerations](#additional-considerations)
4. [Setting Up](#setting-up)
5. [Future Enhancements](#future-enhancements)

---

## Firestore Collections and Documents

### 1. Users
**Collection Name:** `Users`  
Stores user details such as personal information, addresses, and roles.

**Fields:**
- `name` (string)
- `email` (string)
- `phone` (string)
- `address` (map: `street`, `city`, `state`, `zip`)
- `created_at` (timestamp)
- `wishlist` (array of product IDs)
- `role` (string: "customer" or "admin")

---

### 2. Products
**Collection Name:** `Products`  
Contains details about the products available in the store.

**Fields:**
- `name` (string)
- `description` (string)
- `price` (number)
- `stock` (number)
- `category_id` (reference to `Categories`)
- `images` (array of URLs)
- `rating` (number)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

### 3. Categories
**Collection Name:** `Categories`  
Defines product categories and subcategories.

**Fields:**
- `name` (string)
- `description` (string)
- `parent_id` (reference to another category)
- `created_at` (timestamp)

---

### 4. Orders
**Collection Name:** `Orders`  
Stores information about user purchases.

**Fields:**
- `user_id` (reference to `Users`)
- `order_date` (timestamp)
- `status` (string: "pending", "shipped", "delivered")
- `total` (number)
- `items` (array of maps containing `product_id`, `quantity`, `price`)
- `shipping_address` (map: same structure as user `address`)
- `payment_status` (string: "paid", "unpaid")
- `payment_method` (string: "credit card", "paypal")

---

### 5. Reviews
**Collection Name:** `Reviews`  
Captures user feedback on products.

**Fields:**
- `user_id` (reference to `Users`)
- `product_id` (reference to `Products`)
- `rating` (number)
- `comment` (string)
- `created_at` (timestamp)

---

### 6. Cart
**Collection Name:** `Cart`  
Manages user-specific shopping cart data.

**Fields:**
- `user_id` (reference to `Users`)
- `items` (array of maps containing `product_id`, `quantity`)

---

## Firestore Security Rules
To secure Firestore data, the following rules are implemented:

- **Users:** Each user can only access their own data.
- **Products:** Publicly readable; writable only by admins.
- **Orders:** Accessible only by the user who placed the order and admins.
- **Cart:** Accessible only by the user who owns the cart.

---
