# Bike Rental Reservation System Backend

This project implements the backend for a Bike Rental Reservation System.

## Features

### User Management

- **User Registration**: Register new users with roles (admin / user).
- **User Authentication**: Secure login functionality with JWT token-based authentication.
- **Profile Management**: View user profile, update profile details.

### Bike Management

- **Bike CRUD Operations**: Admin can create, read, update, and delete bikes.
- **Availability Management**: Track and update bike availability.
- **Detailed Bike Information**: Includes details like model, brand, price per hour, and availability status.

### Rental Management

- **Rental Creation**: Rent bikes with specified start and return times.
- **Rental Completion**: Admin can mark rentals as returned, calculating costs based on rental duration.
- **Rental History**: View rental history for users.

## Installation

```bash
# Clone the repository
git clone https://github.com/RobinTheRedLight/bike-rental-service.git
cd  bike-rental-service

# Install dependencies
npm install

# Create a .env file in the root directory and define the following variables:
PORT=5000
MONGODB_URI=[MongoDB Connection URI]
JWT_SECRET=[Your JWT Secret Key]

# Start the server in development mode
npm run start:dev
```
