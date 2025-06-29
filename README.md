# Simplified E-commerce App

This simplified app shows a list of products and lets users view product details. Users can add or remove products from the cart and change the quantity of items as needed. They can use the SAVE10 coupon code to get a discount, and the app will automatically calculate totals and discounts in the order summary.

- Cart state is managed globally using React Context
- Coupon code discounts are applied per item (check utils/couponUtils.js).
- Quantity updates instantly adjust cart totals.
- Discounts appear per item and in the summary if a valid coupon is used.
- Added a cart and pricing logic (check utils/cartUtils.js).

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (or yarn)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/RachelAbbie/simplified-ecommerce-app.git
    cd simplified-ecommerce-app
    ```
2. Rename the environment example file **.env.example** to **.env**. The project uses a .env file to store environment variables.
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
Start the app:
```bash
npm run dev
```
The application will be available at http://localhost:5173

## Running Tests
This project uses **Vitest** for unit testing.

1. If you haven't already, install dev dependencies:
    ```bash
    npm install
    ```
2. Run the tests:
    ```bash
    npm test
    ```
   Or to use the interactive UI:
    ```bash
    npm run test:ui
    ```
---

## Notes (Time Spent)

I spent around **5–6 hours** building this project from start to finish.

You may notice from the commit history that the repository was set up earlier. I couldn't finish everything in one sitting since I took care of other things during that time. I worked on this project **bit by bit whenever I found time** until it was completed. 

---

## Project Folder Guide

 - **`src/`** – Main project folder (like `src/app/` in Angular).
    - **`components/`** – Reusable UI parts (like Angular components).
    - **`pages/Home.jsx`** – Main page view (like a routed Angular component).
    - **`contexts/CartContext.jsx`** – Manages global cart data (similar to an Angular service state management).
    - **`services/productService.js`** – Handles API calls (like Angular services using `HttpClient`).
    - **`utils/`** – Helper functions for cart and coupon logic (like utility services in Angular).
    - **`App.jsx`** – Main app layout and routing (similar to `app.component.ts` with `<router-outlet>`).
    - **`main.jsx`** – Starts the app (similar to `main.ts` in Angular).
---

## Future Improvements & Enhancements
- **State Management & Persistence**: Can use React Redux Toolkit for more scalable state management
- **User Experience**: Add modals or toast messages to let users know when they add/remove items or apply coupons.
- **Product Search & Filtering**: Add search, filter, and sort features for products.
- **Checkout & Payment Integration**: Add a real checkout and payment system.
- **Order History**: Allow users to view past orders.
- **API Integration**: Connect to a real backend API for products, orders, and user data.


## Assumptions
- For single user session only without login or registration
- Cart and coupon logic handled entirely on the client
- Products are fetched from mokced product data [Fake Store API](https://fakestoreapi.com/)
- Checkout flow and payment gateway integration are not implemented
- Supports only one coupon code (SAVE10) with basic, hardcoded discount rules
- Product stock or inventory levels are not tracked
- App uses one lamguage only (English) and one currency (USD)
- No search, categories or sorting functionality