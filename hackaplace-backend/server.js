require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');

// Initialize Firebase Admin (optional - add firebase-service-account.json for production)
try {
  const serviceAccount = require('./firebase-service-account.json');
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin initialized');
} catch (error) {
  console.log('Firebase service account not found. Firebase features will be disabled.');
  console.log('To enable Firebase auth, add firebase-service-account.json to the root directory.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackaplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/submissions', require('./routes/submissions'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
