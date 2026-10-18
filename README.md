# MyPortfolio - MERN Portfolio Application (Backend)

**Course:** COMP229 - Web Application Development, Assignment 2 (Node.js, Express REST APIs \& MongoDB)\
**Author:** Francis Torres\
**Front end:** React + Vite portfolio from Assignment 1 (`/client`) - live at https://francis-torres-portfolio.vercel.app\
**Back end:** Node.js + Express 5 + Mongoose (MongoDB) with JWT authentication (`/server`, `server.js`)

## What is in this project

```
MyPortfolio/
  client/                 React front end (Assignment 1) - contact form now saves to the API
  server.js               Back-end entry point: DB connection, welcome route, error handlers, listen
  server/
    express.js            Express app: middleware (body-parser, cookies, compression, helmet, cors) + API routes
    assets-router.js      Redirects image/video requests to the Vite dev server (Week 3 slides)
    config/config.js      Settings read from .env (port, MongoDB URI, JWT secret)
    models/               contact, project, qualification, user (Mongoose schemas)
    controllers/          contact, project, qualification, user, auth (request handlers)
    routes/               contact, project, qualification, user, auth (URL maps)
    helpers/              error handling, id validation, field whitelisting, password hashing
  postman/                Postman collection that tests every endpoint
  docs/API.md             Full endpoint reference and access rules
  .env.example            Template for your private .env file
```

## Setup (first time)

1. **Install Node.js 18+** (check with `node -v`).
2. **Create a MongoDB database named** **`Portfolio`.** Either install MongoDB locally or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, then copy the connection string.
3. **Create your** **`.env`** **file:** copy `.env.example` to `.env` (same folder as `server.js`) and set `MONGODB_URI` and `JWT_SECRET`. The `.env` file is git-ignored - never commit it.
4. **Install dependencies** (two places - back end in the root, front end in `/client`):\
   npm install\
   cd client\
   npm install

## Run it

From the `client` folder, one command starts the front end and the back end together (using `concurrently` and `nodemon`, as in the Week 3 slides):

```
cd client
npm run dev
```

| Part | URL |
| --- | --- |
| React front end | http://localhost:5173/ |
| Express back end | http://localhost:3000/ -\> `{"message":"Welcome to My Portfolio application."}` |

The back end alone: `node server.js` from the project root (or `npm run server` for auto-restart).\
The console should print `App running in port 3000` and `Connected to the "Portfolio" database.`

## REST API

Contacts, projects, qualifications and users each support: get all, get by id, create, update by id, delete by id and delete all. Sign-in and sign-out use JWT. See [`docs/API.md`](docs/API.md) for every URL, field and access rule.

**Who can do what**

- Public: register a user, sign in, submit a contact (the site's contact form), read projects and qualifications.
- Signed-in (JWT required): everything else. Updating or deleting a single user also requires it to be your own account.

## Testing the API

Import `postman/MyPortfolio.postman_collection.json` into Postman (or Thunder Client), start the server and run the folders in order. The collection signs in automatically, stores the token, and includes checks for expected status codes (including 401 without a token and 403 for another user's account).

## Security notes

- Passwords are hashed with a per-user salt (Node `crypto.scrypt`) and are never returned by the API.
- JWTs are signed with a secret from `.env`; `helmet` sets secure headers; request fields are whitelisted.
- Secrets live in `.env`, which is excluded from Git.

## AI Use Disclosure

In line with the course's permitted-use policy for AI tools, I used an AI assistant (Claude, by Anthropic) while building this project.

**How AI was used**

- Translating the assignment specification and the Week 3 course slides into the back-end structure (Express app, Mongoose models, controllers, routes, JWT authentication) and the Postman collection.
- Drafting code comments, this README, the API reference and the template for the submission document.
- Suggesting security practices (password hashing, id validation, field whitelisting, route protection).

**What I did myself**

- Provided the assignment sheet, course slides and my Assignment 1 front end, and directed the work.
- Set up MongoDB, created my own `.env`, ran the application, tested every endpoint and captured the screenshots in the submission document.
- Reviewed the code so that I can explain how the models, controllers, routes and authentication work.

The commit history shows Claude as a co-author on the commits it helped produce.
