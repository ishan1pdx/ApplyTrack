# ApplyTrack

A job application tracker for CS 465 Full Stack Web Development.

## Team
- Ishan Dhar
- Aidan Brennan
- Abhi Akkal

## Project structure
- client/ — React frontend
- server/ — Express backend

## Run the backend

Open a terminal in the repository folder:

```bash
cd server
npm install
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

## Health check

Open http://localhost:3001/api/health

Expected response:

```json
{"status":"ok","message":"ApplyTrack API is running"}
```

## Current progress

The backend server and health check are implemented.
Frontend, database, and application API routes are planned.

## Libraries
- Express: https://expressjs.com/