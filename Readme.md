# 🫏Wildlife Sanctuary API Documentation

---

## **Overview**  
The **Wildlife Sanctuary API** is a comprehensive system designed to facilitate the management, monitoring, and engagement of activities within a wildlife sanctuary. It provides structured endpoints for various stakeholders, including staff, researchers, volunteers, and visitors, ensuring seamless interaction with the sanctuary’s digital ecosystem.  

### **Key Features:**  
- **Donations Management:** Allows users to make, track, and manage donations supporting wildlife conservation efforts.  
- **Educational Resources:** Offers articles, quizzes, live cams, and interactive learning experiences for the public and researchers.  
- **Research & Wildlife Tracking:** Enables wildlife researchers to monitor and update data on different species, including GPS tracking.  
- **Emergency Alerts & AI Risk Detection:** Provides real-time alerts for poaching, distress situations, and environmental threats with AI-assisted risk analysis.  
- **Marketplace:** A platform for purchasing eco-friendly products, sanctuary souvenirs, and booking guided tours.  
- **Staff & Volunteer Coordination:** Facilitates task assignments, shift scheduling, and communication among sanctuary personnel and volunteers.  
- **Tour & Ticketing System:** Manages visitor tours, bookings, cancellations, and reviews to enhance visitor experience.  
- **User Authentication & Roles:** Implements secure user authentication with role-based access control for administrators, staff, volunteers, and the public.  
- **Weather & Climate Monitoring:** Provides real-time weather updates, forecasts, and climate change analysis for sanctuary management and visitor safety.  

### **Target Users:**  
- **Sanctuary Staff & Administrators:** Manage operations, schedules, and communication within the sanctuary.  
- **Researchers & Conservationists:** Access wildlife data, track animals, and report conservation findings.  
- **Volunteers & Donors:** Support sanctuary efforts by volunteering, donating, or purchasing sustainable products.  
- **Visitors & Tourists:** Explore educational content, book guided tours, and engage with wildlife conservation initiatives.  

The **Wildlife Sanctuary API** aims to enhance conservation efforts by leveraging technology to streamline operations, foster engagement, and ensure the safety and well-being of both wildlife and visitors.  



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


## Base URL
```
https://wildlife-sanctuary-api.onrender.com/api/v1/{endpoints}
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (if running locally)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   REFRESH_SECRET=refresh_secret_key
   CLIENT_URL=url
   NODE_ENV=production 
   WEATHER_API_KEY=weather_api_from_openmap

   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Usage
All endpoints must be prefixed with `/api/v1`.

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
<img src="/images/add a donation.png" alt="" >


### **GET /donations/my-donations/:donationId** - Get User's Donation
- **Description:** Fetches a specific user's donation record.
- **Parameters:** `donationId`
- **Response:** Returns the donation details.
<img src="/images/get donation by id.png" alt="" >



---
## **2. Education API**
### **GET /education/articles** - Get All Articles
- **Description:** Fetches all educational articles.
- **Response:** Returns an array of articles.
<img src="/images/get all article.png" alt="" >


### **GET /education/articles/:id** - Get Article by ID
- **Parameters:** `id` (Article ID)
- **Response:** Returns article details.
<img src="/images/get article by id.png" alt="" >


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
<img src="/images/create article.png" alt="" >


### **POST /education/articles/:id/comment** - Add Comment
- **Middleware:** `authMiddleware`
- **Request Body:**
  ```json
  {
    "comment": "Great article!"
  }
  ```
- **Response:** Returns the added comment.
<img src="/images/add comment to the article.png" alt="" >


### **GET /education/quizzes** - Get All Quizzes
- **Response:** Returns an array of quizzes.
<img src="/images/get all quiz.png" alt="" >


### **GET /education/quiz/random** - Get a Random Quiz
- **Response:** Returns a randomly selected quiz.
<img src="/images/get random quiz.png" alt="" >


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
<img src="/images/create a quiz.png" alt="" >


### **GET /education/live-cams** - Get All Live Cams
- **Response:** Returns a list of live animal cams.
<img src="/images/status of all webcam.png" alt="" >


### **GET /education/live-cams/:id** - Get Live Cam by ID
- **Parameters:** `id`
- **Response:** Returns details of a specific live cam.
<img src="/images/status of webcam by id.png" alt="" >


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
<img src="/images/start a webcam.png" alt="" >


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
<img src="/images/add an alert.png" alt="" >


### **GET /alerts** - Get All Alerts
- **Response:** Returns all reported alerts.
<img src="/images/get all alert.png" alt="" >


### **PUT /alerts/resolve/:id** - Resolve an Alert
- **Parameters:** `id`
- **Response:** Confirms resolution.
<img src="/images/resolve the alert.png" alt="" >


### **GET /alerts/ai-risk-detection** - AI Risk Detection
- **Response:** Returns AI analysis on sanctuary risks.
<img src="/images/ai risk detection.png" alt="" >


### **POST /alerts/panic-buttons** - Trigger Panic Button
- **Response:** Sends emergency response notification.
<img src="/images/panic button pressed.png" alt="" >


---
## **4. Weather API**
### **GET /weather/current** - Get Current Weather
- **Description:** Fetches current weather conditions in the sanctuary.
- **Response:** Returns weather details including temperature, humidity, and wind speed.
<img src="/images/current weather.png" alt="" >


### **GET /weather/forecast** - Get Weather Forecast
- **Description:** Provides a short-term weather forecast.
- **Response:** Returns upcoming weather conditions.
<img src="/images/weather forecast.png" alt="" >


### **GET /weather/climate-tracker** - Climate Change Tracker
- **Description:** Monitors climate change trends affecting the sanctuary.
- **Response:** Returns climate statistics.
<img src="/images/climate tracker.png" alt="" >


### **GET /weather/wildlife-alerts** - Get Wildlife Weather Alerts
- **Description:** Fetches weather-related wildlife alerts.
- **Response:** Returns alerts for extreme conditions.
<img src="/images/weather alert.png" alt="" >


---
## **5. Wildlife API**
### **GET /wildlife** - Get All Wildlife Data
- **Response:** Returns all recorded animals in the sanctuary.
<img src="/images/get all animals.png" alt="" >


### **GET /wildlife/:animalId** - Get Animal by ID
- **Parameters:** `animalId`
- **Response:** Returns details of the specified animal.
<img src="/images/animal by id.png" alt="" >


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
<img src="/images/add_wildlife.png" alt="" >


### **GET /wildlife/gps-tracking/:animalId** - Get GPS Tracking
- **Parameters:** `animalId`
- **Response:** Returns real-time GPS tracking data.
<img src="/images/gps tracking.png" alt="" >


### **POST /wildlife/health-check** - Submit Animal Health Check
- **Middleware:** `authMiddleware`
- **Response:** Confirms submission.
<img src="/images/health check.png" alt="" >



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
<img src="/images/register.png" alt="" >


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
<img src="/images/login.png" alt="" >


### **GET /profile** - Get User Profile
- **Description:** Fetches the authenticated user's profile details.
- **Middleware:** `authMiddleware`
- **Response:** Returns user details such as name, email, and role.
<img src="/images/get_profile.png" alt="" >


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
<img src="/images/update-profile.png" alt="" >


### **DELETE /delete-account** - Delete User Account
- **Description:** Allows an authenticated user to delete their account permanently.
- **Middleware:** `authMiddleware`
- **Response:** Confirms account deletion.
<img src="/images/delete-profile.png" alt="" >


### **POST /logout** - User Logout
- **Description:** Logs out the authenticated user by clearing session tokens.
- **Response:** Confirms successful logout.
<img src="/images/logout.png" alt="" >



## **7. Marketplace API**

### **GET /shop/products** - Fetch All Products
- **Description:** Retrieves all products available in the marketplace.
- **Response:** Returns an array of available products.
<img src="/images/get all product.png" alt="" >


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
<img src="/images/place an order.png" alt="" >


### **GET /shop/get-order** - Retrieve Order Details
- **Description:** Fetches details of a user's past orders.
- **Response:** Returns an array of order details.
<img src="/images/get all order.png" alt="" >


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
<img src="/images/add review on product.png" alt="" >


### **GET /shop/eco-products** - Fetch Eco-Friendly Products
- **Description:** Retrieves a list of eco-friendly and sustainable products.
- **Response:** Returns an array of eco-friendly products.
<img src="/images/shop only ecofriendly.png" alt="" >



## **8. Staff & Volunteer API**

### **GET /staff** - Fetch All Staff Members
- **Description:** Retrieves a list of all staff members working at the sanctuary.
- **Response:** Returns an array of staff member details.
<img src="/images/get all staff.png" alt="" >


### **GET /staff/:id** - Fetch Staff Member by ID
- **Description:** Retrieves details of a specific staff member.
- **Parameters:** `id` (Staff Member ID)
- **Response:** Returns the staff member’s details.
<img src="/images/get staff by id.png" alt="" >


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
<img src="/images/add staff.png" alt="" >


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
<img src="/images/update staff.png" alt="" >


### **DELETE /delete-staff/:id** - Remove Staff Member
- **Description:** Allows admins to delete a staff member from the system.
- **Parameters:** `id` (Staff Member ID)
- **Response:** Returns confirmation of staff deletion.
<img src="/images/delete the staff.png" alt="" >


### **GET /volunteer** - Fetch All Volunteers
- **Description:** Retrieves a list of all volunteers assisting at the sanctuary.
- **Response:** Returns an array of volunteer details.
<img src="/images/get all volunteer.png" alt="" >


### **GET /volunteer/match** - Match Volunteers to Tasks
- **Description:** Matches volunteers with tasks based on their skills and availability.
- **Response:** Returns a list of matched volunteers with assigned tasks.
<img src="/images/volunteer match.png" alt="" >


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
<img src="/images/add staff schedule.png" alt="" >


### **POST /staff/notifications** - Send Notifications to Staff
- **Description:** Allows admins to send important updates and notifications to staff members.
- **Request Body:**
  ```json
  {
    "message": "Urgent meeting at 3 PM in the conference room."
  }
  ```
- **Response:** Returns confirmation of the notification being sent.
<img src="/images/notification of all staff.png" alt="" >




## **9. Tour & Ticket API**

### **GET /tours** - Fetch All Tours
- **Description:** Retrieves a list of all available tours at the sanctuary.
- **Response:** Returns an array of tour details.
<img src="/images/all tour for admin.png" alt="" >


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
<img src="/images/book a tour.png" alt="" >


### **GET /tours/my-bookings** - Fetch User's Bookings
- **Description:** Retrieves all tours booked by the authenticated user.
- **Response:** Returns an array of user's bookings.
<img src="/images/get my spefic order.png" alt="" >


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
<img src="/images/reschedule the tour.png" alt="" >


### **DELETE /tours/cancel/:tourId** - Cancel a Tour Booking
- **Description:** Allows users to cancel their tour booking.
- **Parameters:** `tourId` (Tour ID)
- **Response:** Returns confirmation of cancellation.
<img src="/images/cancel the tour.png" alt="" >


### **GET /tours/reviews/:tourId** - Fetch Tour Reviews
- **Description:** Retrieves reviews for a specific tour.
- **Parameters:** `tourId` (Tour ID)
- **Response:** Returns an array of reviews.
<img src="/images/review by id.png" alt="" >


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
<img src="/images/add a review on tour.png" alt="" >




