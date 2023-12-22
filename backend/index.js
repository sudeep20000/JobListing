const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
