# Daily Expenses Sharing Application - Backend

This repository contains the backend for a daily-expenses sharing application. The application allows users to add and split expenses using various methods (exact amounts, percentages, or equal split), manage user details, and generate downloadable balance sheets.

## Features

- **User Management**: Create and manage users (name, email, mobile number).
- **Expense Management**: Add expenses and split them using three methods:
  - Equal Split
  - Exact Amount
  - Percentage Split
- **Balance Sheet**: Retrieve individual and overall expenses, and download balance sheets in CSV format.
- **Input Validation**: Ensures that inputs are correct (e.g., percentages add up to 100%).

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose for object modeling)
- json2csv (for generating CSV files)
- Postman (for testing APIs)

## Installation

### Prerequisites

Make sure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/expenses-sharing-app-backend.git
   cd expenses-sharing-app-backend



2. **Install Dependencies:**

   Install the project dependencies by running:

   ```bash
   npm install
   ```

3. **Create `.env` File:**

   Create a `.env` file in the root of the project with the following content:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/expensesDB
   ```

   Replace the `MONGO_URI` with your own MongoDB connection string if necessary.

4. **Run the Application:**

   You can start the server by running:

   ```bash
   npm start
   ```

   The backend will be accessible at `http://localhost:3000`.

## API Documentation

### User Endpoints

#### 1. Create User

- **URL**: `/users`
- **Method**: `POST`
- **Description**: Creates a new user.
- **Request Body**:

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "mobile": "1234567890"
   }
   ```

- **Response**:

   ```json
   {
     "_id": "64b7c06b30d39e00154f0f96",
     "name": "John Doe",
     "email": "john@example.com",
     "mobile": "1234567890"
   }
   ```

#### 2. Retrieve User Details

- **URL**: `/users/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a specific user by their ID.

### Expense Endpoints

#### 1. Add Expense

- **URL**: `/expenses`
- **Method**: `POST`
- **Description**: Adds an expense and splits it among the participants.
- **Request Body**:

   ```json
   {
     "payerId": "64b7c06b30d39e00154f0f96",
     "totalAmount": 3000,
     "splitMethod": "equal", // Can be 'equal', 'exact', or 'percentage'
     "participants": [
       {
         "userId": "64b7c06b30d39e00154f0f97",
         "amount": 1000
       },
       {
         "userId": "64b7c06b30d39e00154f0f98",
         "amount": 1000
       }
     ]
   }
   ```

#### 2. Retrieve User's Expenses

- **URL**: `/expenses/:userId`
- **Method**: `GET`
- **Description**: Retrieves all expenses for a specific user.

#### 3. Retrieve Overall Expenses

- **URL**: `/expenses`
- **Method**: `GET`
- **Description**: Retrieves all expenses in the system.

#### 4. Download Balance Sheet

- **URL**: `/download-balance-sheet`
- **Method**: `GET`
- **Description**: Generates a downloadable CSV file with expense and participant details.

### Data Validation

- Ensure that for the **percentage** split method, the sum of percentages adds up to 100%.
- Ensure that the **amount** field is provided for each participant in the **exact** and **percentage** methods.

## Running Tests

You can use [Postman](https://www.postman.com/) or any other API testing tool to test the endpoints.

1. **Create User**:
   - Use `POST /users` with a JSON body containing `name`, `email`, and `mobile`.
   
2. **Add Expense**:
   - Use `POST /expenses` with a JSON body containing `payerId`, `totalAmount`, `splitMethod`, and `participants`.
   
3. **Download Balance Sheet**:
   - Use `GET /download-balance-sheet` to download the balance sheet as a CSV file.
