# NileWay Rentals - Localhost Routes Documentation

## 🚗 Complete Route Map for Development

### Main Application Routes (Public Pages)

| Route | Method | Description | View File |
|-------|--------|-------------|-----------|
| `/` | GET | Homepage - Main landing page | `views/home.ejs` |
| `/explore` | GET | Browse available cars | `views/Explore.ejs` |
| `/about` | GET | About Us page | `views/AboutUs.ejs` |
| `/contact` | GET | Contact Us page | `views/ContactUs.ejs` |
| `/policy` | GET | Our Policy page | `views/OurPolicy.ejs` |
| `/car/:id` | GET | Individual car details page | `views/cardetails.ejs` |

### Authentication Routes

| Route | Method | Description | View File |
|-------|--------|-------------|-----------|
| `/login` | GET | Login page | `views/login.ejs` |
| `/signup` | GET | User registration page | `views/signup.ejs` |
| `/forgotpassword` | GET | Password recovery page | `views/forgotpassword.ejs` |
| `/resetpass` | GET | Password reset page | `views/resetpass.ejs` |
| `/verify` | GET | Email verification page | `views/verify.ejs` |

### Booking & Payment Routes

| Route | Method | Description | View File |
|-------|--------|-------------|-----------|
| `/checkout` | GET | Checkout page for booking | `views/checkout.ejs` |
| `/success` | GET | Booking confirmation page | `views/success.ejs` |
| `/process-payment` | POST | Process payment (API) | - |

### Admin Routes (Protected)

| Route | Method | Description | View File |
|-------|--------|-------------|-----------|
| `/admin` | GET | Admin dashboard (requests) | `views/admin/requests.ejs` |
| `/admin/dashboard` | GET | Redirects to `/admin` | - |
| `/admin/bookings` | GET | View all bookings | `views/admin/bookings.ejs` |
| `/admin/booking/:id` | GET | Booking details | `views/admin/booking_details.ejs` |
| `/admin/inventory` | GET | Manage car inventory | `views/admin/adminInventory.ejs` |

### API Routes

#### Cars API (`/api/v1/cars`)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/v1/cars` | GET | Get all cars |
| `/api/v1/cars/:id` | GET | Get specific car |
| `/api/v1/cars/store-dates` | GET | Store rental dates |

#### Users API (`/api/v1/users`)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/v1/users` | GET | User management |
| `/api/v1/users/register` | POST | User registration |
| `/api/v1/users/login` | POST | User login |

#### Admin API (`/api/v1/admin`)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/v1/admin` | GET | Admin functions |

#### Booking API
| Route | Method | Description |
|-------|--------|-------------|
| `/api/bookings` | GET | Get all bookings |
| `/api/bookings` | POST | Create new booking |
| `/api/bookings/:reference` | GET | Get booking by reference |
| `/api/bookings/:reference` | PUT | Update booking |
| `/api/bookings/:reference/cancel` | PATCH | Cancel booking |

### Utility Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/lang/:locale` | GET | Language switcher (en/fr) |
| `*` | GET | 404 error page (`views/404.ejs`) |

### Static File Routes

| Route | Description |
|-------|-------------|
| `/css/*` | CSS stylesheets |
| `/js/*` | JavaScript files |
| `/images/*` | Image assets |
| `/pages/*` | Static HTML pages |

## 🌐 Development Server Information

- **Server Port**: 3000 (configurable via PORT environment variable)
- **Database**: MongoDB (configurable via CONNECTION_STRING environment variable)
- **Template Engine**: EJS
- **Session Support**: Yes (express-session)
- **Internationalization**: English & French (`/lang/en`, `/lang/fr`)

## 🚀 Starting the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## 🔒 Authentication Notes

- Admin routes require authentication and admin privileges
- User session data is stored in `req.session.user`
- Unauthenticated admin access redirects to `/login`

## 📱 Usage Examples

### Main Pages
- Homepage: `http://localhost:3000/`
- Browse Cars: `http://localhost:3000/explore`
- Contact: `http://localhost:3000/contact`

### Car Details
- Specific Car: `http://localhost:3000/car/[car-id]`

### Authentication
- Login: `http://localhost:3000/login`
- Register: `http://localhost:3000/signup`

### Admin Panel
- Admin Dashboard: `http://localhost:3000/admin`
- Manage Bookings: `http://localhost:3000/admin/bookings`
- Inventory: `http://localhost:3000/admin/inventory`

### Language Switching
- Switch to French: `http://localhost:3000/lang/fr`
- Switch to English: `http://localhost:3000/lang/en`

## 🛠️ Development Notes

- All routes support internationalization (English/French)
- Routes pass user session and locale data to views
- Error handling includes both API and HTML responses
- 404 pages are properly handled for non-existent routes 