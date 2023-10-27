# Audacia Table Football Coding Challenge

This project is a coding challenge whose instructions are detailed in the file : 2023_coding-challenge-table-football.pdf

## Requirements

### Backend

# - Node.js (v18.18.2)
# - - Express
    NodeJs framework providing a solid set of features. It makes it easy to set up a web server.
# - - prisma
    Modern ORM for Node.js. Makes it easier to work with MySQL databases.
# - - helmet
    Helmet helps protect Express applications by defining various HTTP headers.
# - - cors
    CORS is an Express middleware that can be used to enable resource sharing between multiple origins. We use it to authorize access from the frontend.
# - - joi
    Joi is an object schema validation library used to validate incoming data. It guarantees that data is in the right format before it is processed.
# - - swagger
    Used for documentation and visualization of RESTful APIs. It enables api self-documentation using the OpenAPI standard.

# Dev Dependencies
# - - Mocha
    This is a test framework for Node.js. It organizes and executes unit tests.
# - - Chai
    Assertion library for Node.js. It works in conjunction with Mocha for unit testing.
# - - Sinon
    This is a test library that provides spies, stubs and mocks for JavaScript. It allows us to "simulate" database responses.
# - - Supertest
    This is a test library for testing HTTP servers. It allows us to send http requests for unit testing.
# - - Nodemon
    This is a utility that monitors changes in application files and automatically restarts the server. This is particularly useful during development to avoid manually restarting the server each time a change is made.

# - MySQL (v8.1.0)


### Frontend

# - Node.js (v18.18.2)
# - React (10.2.1)
# - NextJs (13.5.6)
# - - Axios ##
    This is an HTTP client library for the browser. It is used to make HTTP requests to communicate with the API.
# - - react-datepicker
    This is a date and time selection component for React. It makes it easy to integrate date pickers into forms and other components.
# - - react-table
    A table management library for React. It offers flexibility for creating tables, with features such as sorting.
# - - react-toastify
    Allows you to easily add toast notifications to give feedback to the user.

# Dev Dependencies
    These dependencies were added automatically by NextJs when the project was created.
# - - autoprefixer
    This is a post-processor for CSS. It automatically adds  prefixes to CSS rules when necessary to ensure cross-browser compatibility.
# - - eslint
    This is a linter for JavaScript. It analyzes code for potential problems, syntax errors and ensures that code respects certain coding conventions.
# - - postcss
    A tool for transforming CSS with plugins such as autoprefixer. It can be used to add advanced functionalities to CSS and optimize CSS files for production.
# - - tailwindcss
    This is a CSS utility framework. It gives great flexibility in design without having to write a lot of custom CSS.





## How to run this project


1. First, clone the project : git clone https://github.com/my1920/Table-Football-Coding-Challenge
2. Configure a MySQL database


### Backend

1. Open a new terminal in the main project folder
2. Go to the `backend` folder : `cd backend`
3. Install dependencies : `npm install`
4. Create a .env based on the .env.example file and add your MySQL database connection link to the DATABASE_URL="" key
5. Update your DB Schema : `npx prisma db push`
6. Connect to your database and add some examples in the players table
7. Launch the server : `npm start` (The server should start in http://localhost:3000 You need to check the port to make sure that the frontend will be able to join the API).

#### Unit testing

1. Launch the unit testing : `npm test`

### Frontend

1. Open a new terminal in the main project folder
2. Go to the `frontend` folder : `cd frontend`
3. Install dependencies : `npm install`
4. Create a build : `npm run build`
5. Run the frontend : `npm run start`
6. Access to the frontend : http://localhost:3001

#### Eslint testing

1. Launch the lint testing : `npm run lint`




## Reflections, Thoughts

Backend:
- Logging ? There is no logging in the API, in a production environment it would be interesting to add a logging system.
- Authentication ? There is actually no authentication system, so anyone can create new games in the API without logging in.
- API key? It's customary for an API to use a key to protect access to it. This is the basis of security. But in this case, I've chosen not to manage one. For the reasons below, access to the API is not encrypted (http), so it could be easy for a "man in the middle" to grab this key and use it for personal purposes. In addition, if an API key is provided, it will be important to add a frontend(server-side) middleware to process requests and send them to the backend with the API key added. This will add a bit of work, as each request will be made twice.
- HTTPS? It's important to protect discussions with the API by providing https. In our case, this API will never be in real production, and managing a certificate would make the API configuration more cumbersome.
- What about equalization? At present, they provide us with dirty data for the win / loss / ratio etc. sections.
- In the last minutes, I deleted the dotenv module that lets us load .env files into nodeJs. I deleted it because we don't actually use it, Primsa doesn't need it to take the "DATABASE_URL" key. Usually, we need it at least to load the API key.
- It might be worth adding eslint to the backend to keep the code away from potential problems, syntax errors and to ensure that the code respects certain coding conventions.

Frontend:
- Because all the instructions are in English, I've concluded that all users who use this application will speak English. But in other cases, it might be interesting to add an internationalization system.
- There's no pagination system in the table, so for a few results it's no big deal, but for a large number of players and games, it would speed up the loading of data in frontend and backend .
- I've made it responsive.
- It might be interesting to add unit tests to the front-end as well. I haven't added them for timing reasons.

Frontend & Backend :
- It could be interesting to add integration tests and end-to-end tests with Cypress, for example.
- I've added the database schema and the UX/UI I made at the start of the project to the "working files" folder. I created these different files to help me define the project structure, define the API routes, define the database, etc...