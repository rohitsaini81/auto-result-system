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
    console.log("\n db on!");
  } catch (error) {
    console.log("ab kya hua \n",error);
  }
};

import "./circle.js";
import { calledgamesobj, setdate, timeString } from './circle.js';

dbcon(uri);

// {
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Use the URL object to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
})
// }
app.get('/api/6', async(req,res)=>{
  const date = "12"+setdate[2]+(setdate[3]<10?"0"+setdate[3]:setdate[3])+"/2023"
  try {
    const pro = await Book.find({"date": setdate});
    res.status(200).send(pro)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
app.get('/api/7', async(req,res)=>{
  try {
    const pro = await Book.find();
    res.status(200).send(pro)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
app.get('/api/8', async(req,res)=>{
  res.sendFile(__dirname+'/domcdn.js')
 })
app.get('/api/9', async(req,res)=>{
 res.sendFile(__dirname+'/Tokyo.mp4')
})
app.get('/inf',(req,res)=>{
  const date = "12"+setdate[2]+(setdate[3]<10?"0"+setdate[3]:setdate[3])+"/2023"
  res.send(timeString+date+"\n"+calledgamesobj)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
  });
// this is rohit saini
