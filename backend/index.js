const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

// Routes
const signupRoutes = require('./routes/signup');    
const signinRoutes = require('./routes/signin');

// API routes
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`✅ Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));


