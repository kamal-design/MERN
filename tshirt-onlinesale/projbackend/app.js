require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
//middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//TODO: MY ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//TODO: mongoosedb connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}).then( () => {
  console.log("MONGODB CONNNECTED");
}).catch( err => console.log("Database Not Connected."));



//TODO: middleware parse application
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//TODO: MY ROUTES Middleware injacted here
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//TODO: HOMEPAGE ROUTE
app.get("/", (req, res) => {
  return res.send("Home Page");
});

//POST LISTEN
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

