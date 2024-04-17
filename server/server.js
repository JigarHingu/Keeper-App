import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import notesRouter from './routes/notes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL,)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use('/notes', notesRouter); // Define API routes for notes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
