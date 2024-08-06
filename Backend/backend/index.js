require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDb = require("./Config/db");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// app.use("/api/getDefalutNews", require("./routes/NewsRoutes"));

// app.use("/api/getNewsBySearch", require("./routes/NewsRoutes"));

// app.get("/api/products", async (req, res) => {
//   try {
//     const product = await Product.find();
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });
app.use("/api/News", require("./routes/NewsRoutes"));

app.use("/api/user", require("./routes/UserRoutes"));

app.listen(port, () => console.log(`Server started on Port ${port}`));
