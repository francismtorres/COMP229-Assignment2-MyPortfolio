# MyPortfolio REST API reference

Base URL (development): `http://localhost:3000`  
All request and response bodies are JSON. Protected routes need a JWT, sent as
`Authorization: Bearer <token>` (or via the `t` cookie set by sign-in).

## Authentication

| Method | URL | Access | Action |
|--------|-----|--------|--------|
| POST | `/auth/signin` | public | Check `email` + `password`, return `{ token, user }` and set the `t` cookie |
| GET | `/auth/signout` | public | Clear the `t` cookie |

Sign-in example body: `{ "email": "francis.test@example.com", "password": "Passw0rd!23" }`

Tokens are signed with `JWT_SECRET` (HS256) and expire after `JWT_EXPIRES_IN` (default 1 day).
JWTs are stateless: sign-out clears the cookie, and clients should discard the token.

## Contacts  (`/api/contacts`)

Fields: `firstname` (string), `lastname` (string), `email` (string)

| Method | URL | Access | Action |
|--------|-----|--------|--------|
| GET | `/api/contacts` | signed-in | Get all contacts |
| GET | `/api/contacts/:id` | signed-in | Get contact by id |
| POST | `/api/contacts` | **public** (used by the site's contact form) | Add new contact |
| PUT | `/api/contacts/:id` | signed-in | Update contact by id |
| DELETE | `/api/contacts/:id` | signed-in | Remove contact by id |
| DELETE | `/api/contacts` | signed-in | Remove all contacts |

## Projects  (`/api/projects`)

Fields: `title`, `firstname`, `lastname`, `email` (strings), `completion` (Date), `description` (string)

| Method | URL | Access | Action |
|--------|-----|--------|--------|
| GET | `/api/projects` | **public** | Get all projects |
| GET | `/api/projects/:id` | **public** | Get project by id |
| POST | `/api/projects` | signed-in | Add new project |
| PUT | `/api/projects/:id` | signed-in | Update project by id |
| DELETE | `/api/projects/:id` | signed-in | Remove project by id |
| DELETE | `/api/projects` | signed-in | Remove all projects |

## Qualifications  (`/api/qualifications`)

Same fields and access rules as projects.

| Method | URL | Access | Action |
|--------|-----|--------|--------|
| GET | `/api/qualifications` | **public** | Get all qualifications |
| GET | `/api/qualifications/:id` | **public** | Get qualification by id |
| POST | `/api/qualifications` | signed-in | Add new qualification |
| PUT | `/api/qualifications/:id` | signed-in | Update qualification by id |
| DELETE | `/api/qualifications/:id` | signed-in | Remove qualification by id |
| DELETE | `/api/qualifications` | signed-in | Remove all qualifications |

## Users  (`/api/users`)

Fields: `name` (string), `email` (string, unique), `password` (string, stored as a salted scrypt hash),
`created` (Date, automatic), `updated` (Date, set on update)

| Method | URL | Access | Action |
|--------|-----|--------|--------|
| GET | `/api/users` | signed-in | Get all users |
| GET | `/api/users/:id` | signed-in | Get user by id |
| POST | `/api/users` | **public** (registration) | Add new user |
| PUT | `/api/users/:id` | signed-in, **own account only** | Update user by id |
| DELETE | `/api/users/:id` | signed-in, **own account only** | Remove user by id |
| DELETE | `/api/users` | signed-in | Remove all users |

Passwords are never returned by any endpoint.

## Status codes

| Code | Meaning |
|------|---------|
| 200 | Success (read, update, delete) |
| 201 | Created |
| 400 | Validation error, malformed JSON or invalid id |
| 401 | Missing, invalid or expired token; wrong email/password |
| 403 | Signed in, but not allowed (editing another user's account) |
| 404 | Record or route not found |
| 500 | Unexpected server error |

Error responses look like `{ "error": "Readable message." }`.
