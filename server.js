// Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log mongoose queries
mongoose.set('debug', true);
mongoose.set('strictQuery', false);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));


