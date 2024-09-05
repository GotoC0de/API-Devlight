import mongoose from "mongoose";
import { config } from "dotenv";

config();

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    const dbURI = process.env.DB_URI as string;

    await mongoose.connect(dbURI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to the database");
  }
}

export default dbConnect;
