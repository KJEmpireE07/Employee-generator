# Employee Generator

A simple Express + Mongoose app that generates dummy employee data and stores it in MongoDB.

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose

## How to Run

1. Clone the repository
   git clone https://github.com/YOUR_USERNAME/employee-generator.git

2. Install dependencies
   npm install

3. Make sure MongoDB is running locally

4. Start the server
   node server.js

5. Open in browser
   http://localhost:3000

## Features
- **Generate Data** — Generates 10 random employees and saves them to MongoDB
- **Clear Data** — Clears all employees from the database and the screen

## API Routes

| Method | Route       | What it does                        |
|--------|-------------|-------------------------------------|
| POST   | /generate   | Clears collection, inserts 10 employees |
| DELETE | /clear      | Deletes all employees from database |

## Project Structure

employee-generator/
├── public/
│   └── index.html    ← Frontend
├── server.js         ← Express + Mongoose backend
├── package.json
└── .gitignore