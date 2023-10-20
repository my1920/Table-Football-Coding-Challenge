# Audacia Table Football Coding Challenge

This project is a coding challenge whose instructions are detailed in the file : 2023_coding-challenge-table-football.pdf

# Requirements

## Backend

- Node.js (v18.18.2)
- - Express
- - prisma
- - helmet
- - joi
- - dotenv
- - swagger
- - Mocha
- - Chai

- MySQL (v8.1.0)


## Frontend



# How to run this project


1. First, clone the project : git clone https://github...
2. Configure a MySQL database


## Backend

1. Go to the `backend` folder : `cd backend`
2. Install dependencies : `npm install`
3. Create a .env based on the .env.example file and add your MySQL database connection link to the DATABASE_URL="" key
4. Update your DB Schema : `npx prisma db push`
5. Connect to your database and add some examples in the players table
6. Launch the server : `npm start`

## Frontend

1. Go to the `frontend` folder : `cd frontend`
