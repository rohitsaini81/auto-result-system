import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    console.log("ab kya hua \n", error);
  }
};

import "./circle.js";

await dbcon(uri);

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use(router)




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
// this is rohit saini
