// Import required packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";

// Import route files
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/ProductSchema.js";
import ProductStat from "./models/ProductStatSchema.js";

// Populate database with sample data
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

dotenv.config();
const app = express();

// Apply middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5001;

// Apply routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
