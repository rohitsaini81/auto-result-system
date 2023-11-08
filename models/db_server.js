
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.URI_PASS}@cluster0.8t0hk4y.mongodb.net/${process.env.DATABASE}`;

const dbcon = async (uri) => {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  };


  const dbclose = async () => {
    try {
      await mongoose.connection.close();
      console.log("We are Disconnecting from MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  
    export { dbcon, dbclose, uri };