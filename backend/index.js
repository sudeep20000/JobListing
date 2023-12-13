const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: false }));

const User = mongoose.model('User', {
  frist_name: String,
  last_name: String,
  email: String,
  avatar: String,
});

app.get('/health', (req, res) => {
  res.json({ status: 'SUCCESS', message: 'All Good' });
});

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`Server is listening on port:${process.env.PORT}...`))
    .catch((error) => console.log(error));
})
