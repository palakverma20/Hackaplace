# Hackaplace Backend

A Node.js/Express backend for the Hackaplace platform, providing APIs for hackathons, teams, users, and submissions.

## Features

- User authentication via Firebase
- Hackathon management
- Team formation and management
- Project submissions
- User profiles and roles

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Firebase Admin SDK for authentication
- CORS support

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/hackaplace
   PORT=5000
   FIREBASE_PROJECT_ID=your-firebase-project-id
   ```

3. Add your Firebase service account key as `firebase-service-account.json` in the root directory.

4. Start MongoDB locally or update `MONGODB_URI` to point to your MongoDB instance.

5. Run the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login/Signup with Firebase token
- `GET /api/auth/verify` - Verify Firebase token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

### Hackathons
- `GET /api/hackathons` - Get all hackathons
- `GET /api/hackathons/:id` - Get hackathon by ID
- `POST /api/hackathons` - Create hackathon (organizer/admin)
- `PUT /api/hackathons/:id` - Update hackathon (organizer/admin)
- `POST /api/hackathons/:id/join` - Join hackathon
- `POST /api/hackathons/:id/judges` - Assign judge to hackathon (organizer/admin)

### Teams
- `GET /api/teams/hackathon/:hackathonId` - Get teams for a hackathon
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create team
- `POST /api/teams/:id/join` - Join team
- `POST /api/teams/:id/leave` - Leave team
- `PUT /api/teams/:id` - Update team (leader only)

### Submissions
- `GET /api/submissions/hackathon/:hackathonId` - Get submissions for a hackathon
- `GET /api/submissions/:id` - Get submission by ID
- `POST /api/submissions` - Create submission
- `PUT /api/submissions/:id` - Update submission (team leader only)

## Authentication

All protected routes require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

## User Roles

- `participant` - Default role, can join hackathons and teams
- `organizer` - Can create and manage hackathons
- `judge` - Can evaluate submissions
- `admin` - Full access to all features

## Database Models

### User
- firebaseUid: String (unique)
- email: String (unique)
- displayName: String
- role: String (enum)
- profile: Object (avatar, bio, skills, social links)

### Hackathon
- name: String
- organizer: ObjectId (ref: User)
- status: String (enum: upcoming, ongoing, completed)
- mode: String (enum: online, offline, hybrid)
- dates: Date fields
- description, rules, etc.
- participants: Array of ObjectId (ref: User)
- teams: Array of ObjectId (ref: Team)
- judges: Array of ObjectId (ref: User)

### Team
- name: String
- hackathon: ObjectId (ref: Hackathon)
- leader: ObjectId (ref: User)
- members: Array of ObjectId (ref: User)
- description, skills, etc.

### Submission
- hackathon: ObjectId (ref: Hackathon)
- team: ObjectId (ref: Team)
- title, description: String
- githubUrl, demoUrl: String
- files: Array of file objects
- status: String (enum)

## Development

The server runs on port 5000 by default. Use `npm run dev` for development with nodemon.

## Deployment

1. Set up MongoDB database
2. Configure Firebase service account
3. Set environment variables
4. Deploy to your preferred hosting service (Heroku, AWS, etc.)
