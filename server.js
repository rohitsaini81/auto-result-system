import mongoose from 'mongoose';
import Book from './models/db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.URI_PASS}@cluster0.8t0hk4y.mongodb.net/${process.env.DATABASE}`;


app.use(cors());
app.use(bodyParser.json());
console.log(3)
// Connect to the MongoDB database
const dbcon = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("db on!");
  } catch (error) {
    console.log("ab kya hua \n",error);
  }
};

import "./circle.js";
import { setdate } from './circle.js';

dbcon(uri);
app.get('/api/6', async(req,res)=>{
  try {
    const pro = await Book.find({"date": setdate});
    res.status(200).send(pro)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
  });
// this is rohit saini