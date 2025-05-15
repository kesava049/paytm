const express = require("express");
require("dotenv").config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

const mainRouter = require('./routes/index');

app.use('/api/v1', mainRouter);


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


