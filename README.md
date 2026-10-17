# ITElect 4 Backend

Express and TypeScript API for the ITElect 4 event and RSVP application. It uses MongoDB through Mongoose and is deployed on Vercel.

## Live application

- **Frontend:** [https://itelect4-project-ten.vercel.app/](https://itelect4-project-ten.vercel.app/)
- **Backend API:** [https://itelect4-backend-seven.vercel.app/](https://itelect4-backend-seven.vercel.app/)
- **Backend health check:** [https://itelect4-backend-seven.vercel.app/api/health](https://itelect4-backend-seven.vercel.app/api/health)

## GitHub repositories

- **Frontend:** [rivioops/itelect4-project](https://github.com/rivioops/itelect4-project.git)
- **Backend:** [rivioops/itelect4-backend](https://github.com/rivioops/itelect4-backend.git)

## GT4 Part 1 — Express and Mongoose RSVP API

- Set up the Express API in TypeScript and connected it to MongoDB with Mongoose.
- Added User and RSVP models, including validation and safe JSON serialization that omits passwords and internal MongoDB fields.
- Added user registration and login. Passwords are hashed with bcrypt, and successful login returns a signed JWT.
- Added bearer-token authentication middleware and protected RSVP routes.
- Implemented RSVP create, list, get-by-ID, update, and delete operations. Users can access only their own RSVPs.
- Added a health endpoint, JSON parsing, CORS support, and centralized validation and error responses.
- Added local development, build, start, and type-check scripts, plus an `.env.example` for configuration.

## GT4 Part 2 — Events and Vercel deployment support

- Added an Event model, three reference events, and a seed script (`npm run seed`) that can be safely rerun.
- Added public event list and event-by-ID endpoints.
- Added request-time MongoDB connection middleware and cached the connection promise for serverless requests. Failed connections can be retried on later requests.
- Added an origin allowlist configured with `CORS_ORIGIN` for local and deployed frontend origins.
- Exported the Express app for Vercel serverless deployment.

## API routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Reports API and database status |
| `POST` | `/api/auth/register` | Public | Creates an attendee account |
| `POST` | `/api/auth/login` | Public | Authenticates and returns a JWT |
| `GET` | `/api/events` | Public | Lists events, ordered by date |
| `GET` | `/api/events/:id` | Public | Gets one event by its string ID |
| `GET` | `/api/rsvps` | Bearer token | Lists the signed-in user's RSVPs |
| `GET` | `/api/rsvps/:id` | Bearer token | Gets one of the signed-in user's RSVPs |
| `POST` | `/api/rsvps` | Bearer token | Creates an RSVP |
| `PATCH` | `/api/rsvps/:id` | Bearer token | Updates one of the signed-in user's RSVPs |
| `DELETE` | `/api/rsvps/:id` | Bearer token | Deletes one of the signed-in user's RSVPs |

Send the JWT in the `Authorization` header for protected routes: `Authorization: Bearer <token>`. RSVP guest counts must be between 1 and 10; statuses are `pending`, `confirmed`, or `waitlisted`.

## Run locally

Requires Node.js and a MongoDB connection string.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
3. Set `CORS_ORIGIN` to the frontend origin, such as `http://localhost:5173` for local development. Multiple origins can be comma-separated.
4. Start the API with `npm run dev` (defaults to port `4000`).
5. Seed the reference events with `npm run seed` when setting up or repopulating the database.

Available scripts: `npm run dev`, `npm run build`, `npm start`, `npm run typecheck`, and `npm run seed`.
