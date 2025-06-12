# Cannabis Dispensary Rewards System

A web application for tracking customer rewards and purchases at a cannabis dispensary.

## Features

- Customer management
- Purchase tracking
- Rewards points system
- Membership tiers (Bronze, Silver, Gold, Platinum)
- Purchase history
- Points earning and redemption

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cannabis-rewards
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `POST /api/customers` - Create a new customer
- `PATCH /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

### Purchases

- `GET /api/purchases` - Get all purchases
- `GET /api/purchases/:id` - Get a specific purchase
- `GET /api/purchases/customer/:customerId` - Get all purchases for a customer
- `POST /api/purchases` - Create a new purchase

## Membership Tiers

- Bronze: Default tier
- Silver: $1,000+ spent
- Gold: $2,500+ spent
- Platinum: $5,000+ spent

## Security

- All API endpoints are protected with JWT authentication
- Customer data is encrypted
- Secure password hashing
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 