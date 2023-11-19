import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const schemas = new mongoose.Schema({
  name: { type: String },
  today: { type: String },
  yesterday: { type: String },
  date: { type: String }

});

const Sattaking = mongoose.model(process.env.COLLECTION, schemas);

export default Sattaking;
