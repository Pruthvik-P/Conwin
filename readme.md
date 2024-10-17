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
