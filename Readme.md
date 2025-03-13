# Wildlife Sanctuary API Documentation

## Overview
The Wildlife Sanctuary API provides endpoints for managing donations, education resources, research, emergency alerts, marketplace, staff and volunteers, tours, user authentication, weather information, and wildlife data.

This API is designed for staff, researchers, volunteers, and the public to interact with the sanctuary's digital ecosystem.

## **Technology Stack**
This API is built using the following technologies:
- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs
- **File Handling:** Multer, Sharp
- **Email Services:** Nodemailer
- **Data Validation:** Express Validator, Validator.js
- **Rate Limiting & Security:** Express-rate-limit, Cookie-parser
- **Environment Variables:** Dotenv
- **Other Utilities:** Axios, UUID, Moment.js, CORS, Body-parser

---
## **1. Donations API**
### **GET /donations** - Get All Donations
- **Description:** Fetches all donation records.
- **Access Control:** Public
- **Response:** Returns an array of all donations.
<img src="/images/get_all_doantion.png" alt="" >


### **POST /donations/make** - Make a Donation
- **Description:** Allows authenticated users to make a donation.
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "amount": 100,
    "method": "Credit Card",
    "donorName": "John Doe"
  }
  ```
- **Response:** Returns donation confirmation.

### **GET /donations/my-donations/:donationId** - Get User's Donation
- **Description:** Fetches a specific user's donation record.
- **Parameters:** `donationId`
- **Response:** Returns the donation details.



---
## **2. Education API**
### **GET /education/articles** - Get All Articles
- **Description:** Fetches all educational articles.
- **Response:** Returns an array of articles.

### **GET /education/articles/:id** - Get Article by ID
- **Parameters:** `id` (Article ID)
- **Response:** Returns article details.

### **POST /education/articles** - Create an Article
- **Middleware:** `authMiddleware`, `authorizeRoles('Staff', 'Admin')`
- **Request Body:**
  ```json
  {
    "title": "Animal Conservation",
    "content": "Details about conservation efforts."
  }
  ```
- **Response:** Returns the created article.

### **POST /education/articles/:id/comment** - Add Comment
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "comment": "Great article!"
  }
  ```
- **Response:** Returns the added comment.

### **GET /education/quizzes** - Get All Quizzes
- **Response:** Returns an array of quizzes.

### **GET /education/quiz/random** - Get a Random Quiz
- **Response:** Returns a randomly selected quiz.

### **POST /education/quizzes** - Create a Quiz
- **Middleware:** `authMiddleware`, `authorizeRoles('Admin')`
- **Request Body:**
  ```json
  {
    "question": "What is the largest land animal?",
    "options": ["Elephant", "Lion", "Tiger"],
    "answer": "Elephant"
  }
  ```
- **Response:** Returns created quiz.

### **GET /education/live-cams** - Get All Live Cams
- **Response:** Returns a list of live animal cams.

### **GET /education/live-cams/:id** - Get Live Cam by ID
- **Parameters:** `id`
- **Response:** Returns details of a specific live cam.

### **POST /education/live-cams** - Create a Live Cam
- **Middleware:** `authMiddleware`, `authorizeRoles('Admin')`
- **Request Body:**
  ```json
  {
    "name": "Tiger Enclosure Cam",
    "location": "Zone B"
  }
  ```
- **Response:** Returns the created live cam.

---
## **3. Emergency Alerts API**
### **POST /alerts/report** - Report an Alert
- **Request Body:**
  ```json
  {
    "type": "Poaching Alert",
    "location": "Zone A"
  }
  ```
- **Response:** Returns confirmation of alert.

### **GET /alerts** - Get All Alerts
- **Response:** Returns all reported alerts.

### **PUT /alerts/resolve/:id** - Resolve an Alert
- **Parameters:** `id`
- **Response:** Confirms resolution.

### **GET /alerts/ai-risk-detection** - AI Risk Detection
- **Response:** Returns AI analysis on sanctuary risks.

### **POST /alerts/panic-buttons** - Trigger Panic Button
- **Response:** Sends emergency response notification.

---
## **4. Weather API**
### **GET /weather/current** - Get Current Weather
- **Description:** Fetches current weather conditions in the sanctuary.
- **Response:** Returns weather details including temperature, humidity, and wind speed.

### **GET /weather/forecast** - Get Weather Forecast
- **Description:** Provides a short-term weather forecast.
- **Response:** Returns upcoming weather conditions.

### **GET /weather/climate-tracker** - Climate Change Tracker
- **Description:** Monitors climate change trends affecting the sanctuary.
- **Response:** Returns climate statistics.

### **GET /weather/wildlife-alerts** - Get Wildlife Weather Alerts
- **Description:** Fetches weather-related wildlife alerts.
- **Response:** Returns alerts for extreme conditions.

---
## **5. Wildlife API**
### **GET /wildlife** - Get All Wildlife Data
- **Response:** Returns all recorded animals in the sanctuary.

### **GET /wildlife/:animalId** - Get Animal by ID
- **Parameters:** `animalId`
- **Response:** Returns details of the specified animal.

### **POST /add-wildlife** - Add a New Animal
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "name": "African Elephant",
    "species": "Loxodonta africana",
    "status": "Endangered"
  }
  ```
- **Response:** Confirms addition.

### **GET /wildlife/endangered** - Get Endangered Species
- **Response:** Returns all endangered species.

### **GET /wildlife/gps-tracking/:animalId** - Get GPS Tracking
- **Parameters:** `animalId`
- **Response:** Returns real-time GPS tracking data.

### **GET /wildlife/population-stats** - Get Population Statistics
- **Response:** Returns wildlife population data.

### **POST /wildlife/health-check** - Submit Animal Health Check
- **Middleware:** `authMiddleware`
- **Response:** Confirms submission.


## **6. User Authentication API**
### **POST /register** - Register a New User
- **Description:** Allows a new user to create an account.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Returns the newly registered user details.

### **POST /login** - User Login
- **Description:** Authenticates a user and provides a JWT token.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Returns authentication token and user details.

### **GET /profile** - Get User Profile
- **Description:** Fetches the authenticated user's profile details.
- **Middleware:** `authMiddleware`
- **Response:** Returns user details such as name, email, and role.

### **PUT /update-profile** - Update User Profile
- **Description:** Allows an authenticated user to update their profile.
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "name": "John Updated",
    "email": "johnupdated@example.com"
  }
  ```
- **Response:** Returns the updated user details.

### **DELETE /delete-account** - Delete User Account
- **Description:** Allows an authenticated user to delete their account permanently.
- **Middleware:** `authMiddleware`
- **Response:** Confirms account deletion.

### **POST /logout** - User Logout
- **Description:** Logs out the authenticated user by clearing session tokens.
- **Response:** Confirms successful logout.


## **7. Marketplace API**

### **GET /shop/products** - Fetch All Products
- **Description:** Retrieves all products available in the marketplace.
- **Response:** Returns an array of available products.

### **POST /shop/place-order** - Place an Order
- **Description:** Allows users to place an order for products.
- **Request Body:**
  ```json
  {
    "userId": "12345",
    "products": [
      { "productId": "67890", "quantity": 2 }
    ],
    "paymentMethod": "Credit Card"
  }
  ```
- **Response:** Returns order confirmation details.

### **GET /shop/get-order** - Retrieve Order Details
- **Description:** Fetches details of a user's past orders.
- **Response:** Returns an array of order details.

### **POST /shop/add-review/:id** - Add Product Review
- **Description:** Allows authenticated users to leave a review for a product.
- **Parameters:** `id` (Product ID)
- **Request Body:**
  ```json
  {
    "rating": 5,
    "review": "Excellent quality!"
  }
  ```
- **Response:** Returns confirmation of the added review.

### **GET /shop/eco-products** - Fetch Eco-Friendly Products
- **Description:** Retrieves a list of eco-friendly and sustainable products.
- **Response:** Returns an array of eco-friendly products.


## **8. Staff & Volunteer API**

### **GET /staff** - Fetch All Staff Members
- **Description:** Retrieves a list of all staff members working at the sanctuary.
- **Response:** Returns an array of staff member details.

### **GET /staff/:id** - Fetch Staff Member by ID
- **Description:** Retrieves details of a specific staff member.
- **Parameters:** `id` (Staff Member ID)
- **Response:** Returns the staff member’s details.

### **POST /add-staff** - Add New Staff Member
- **Description:** Allows admins to add a new staff member.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "role": "Veterinarian",
    "email": "johndoe@example.com",
    "phone": "123-456-7890"
  }
  ```
- **Response:** Returns confirmation of the staff addition.

### **PUT /update-staff/:id** - Update Staff Member Details
- **Description:** Allows admins to update the details of an existing staff member.
- **Parameters:** `id` (Staff Member ID)
- **Request Body:**
  ```json
  {
    "role": "Senior Veterinarian",
    "phone": "987-654-3210"
  }
  ```
- **Response:** Returns confirmation of the update.

### **DELETE /delete-staff/:id** - Remove Staff Member
- **Description:** Allows admins to delete a staff member from the system.
- **Parameters:** `id` (Staff Member ID)
- **Response:** Returns confirmation of staff deletion.

### **GET /volunteer** - Fetch All Volunteers
- **Description:** Retrieves a list of all volunteers assisting at the sanctuary.
- **Response:** Returns an array of volunteer details.

### **GET /volunteer/match** - Match Volunteers to Tasks
- **Description:** Matches volunteers with tasks based on their skills and availability.
- **Response:** Returns a list of matched volunteers with assigned tasks.

### **POST /staff/add-shifts/:id** - Assign Shifts to Staff
- **Description:** Allows admins to assign work shifts to a specific staff member.
- **Parameters:** `id` (Staff Member ID)
- **Request Body:**
  ```json
  {
    "shiftStart": "2025-03-15T08:00:00Z",
    "shiftEnd": "2025-03-15T16:00:00Z"
  }
  ```
- **Response:** Returns confirmation of shift assignment.

### **POST /staff/notifications** - Send Notifications to Staff
- **Description:** Allows admins to send important updates and notifications to staff members.
- **Request Body:**
  ```json
  {
    "message": "Urgent meeting at 3 PM in the conference room."
  }
  ```
- **Response:** Returns confirmation of the notification being sent.



## **9. Tour & Ticket API**

### **GET /tours** - Fetch All Tours
- **Description:** Retrieves a list of all available tours at the sanctuary.
- **Response:** Returns an array of tour details.

### **POST /tours/book** - Book a Tour
- **Description:** Allows authenticated users to book a tour.
- **Request Body:**
  ```json
  {
    "userId": "12345",
    "tourId": "67890",
    "date": "2025-04-10",
    "numGuests": 2
  }
  ```
- **Response:** Returns confirmation of the booking.

### **GET /tours/my-bookings** - Fetch User's Bookings
- **Description:** Retrieves all tours booked by the authenticated user.
- **Response:** Returns an array of user's bookings.

### **PUT /tours/reschedule/:tourId** - Reschedule a Tour
- **Description:** Allows users to reschedule a booked tour.
- **Parameters:** `tourId` (Tour ID)
- **Request Body:**
  ```json
  {
    "newDate": "2025-04-15"
  }
  ```
- **Response:** Returns confirmation of the reschedule.

### **DELETE /tours/cancel/:tourId** - Cancel a Tour Booking
- **Description:** Allows users to cancel their tour booking.
- **Parameters:** `tourId` (Tour ID)
- **Response:** Returns confirmation of cancellation.

### **GET /tours/reviews/:tourId** - Fetch Tour Reviews
- **Description:** Retrieves reviews for a specific tour.
- **Parameters:** `tourId` (Tour ID)
- **Response:** Returns an array of reviews.

### **POST /tours/add-reviews/:tourId** - Add a Review for a Tour
- **Description:** Allows users to add a review for a tour they attended.
- **Parameters:** `tourId` (Tour ID)
- **Request Body:**
  ```json
  {
    "rating": 4,
    "review": "Amazing experience!"
  }
  ```
- **Response:** Returns confirmation of the review submission.




