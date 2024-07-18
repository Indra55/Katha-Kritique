import express from "express";
import mongoose from "mongoose";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Book from './models/bookmodel.js';
import { PORT, mongodburl, googleAPIKey } from './config.js';

const app = express();
app.use(express.json()); // Middleware

mongoose.connect(mongodburl) 
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    }); 
  }) 
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(googleAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fetchBookReview = async (title, wordCount) => {
  const prompt = `Provide a detailed review of the book titled "${title}" with approximately ${wordCount} words.`;

  try {
    console.log('Fetching review from Google AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const review = response.text();
    const actualWordCount = review.split(' ').length;

    console.log('Received review from Google AI:', review);
    return { review, actualWordCount };
  } catch (error) {
    console.error('Error fetching review from Google AI:', error);
    throw error;
  }
};

const fetchBookCover = async (title) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`;
    const response = await axios.get(url);
    const cover = response.data.items[0]?.volumeInfo.imageLinks?.thumbnail || 'No book cover found';
    console.log('Book cover fetched successfully:', cover);
    return cover;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    throw error;
  }
};

// POST endpoint to add a new book and fetch its review and cover
app.post('/api/books', async (req, res) => {
  const { title, wordCount } = req.body;

  try {
    console.log(`Received request to add book: ${title}, wordCount: ${wordCount}`);

    // Fetch book cover and review concurrently
    let [cover, reviewData] = await Promise.all([
      fetchBookCover(title).catch(err => {
        console.error('Error fetching book cover:', err);
        return 'No book cover found';
      }),
      fetchBookReview(title, wordCount).catch(err => {
        console.error('Error fetching review from Google AI, falling back:', err);
        return { review: 'Review not available', actualWordCount: 0 };
      })
    ]);

    // Ensure reviewData is defined and has review and actualWordCount
    const { review, actualWordCount } = reviewData || { review: 'Review not available', actualWordCount: 0 };

    console.log('Saving book to MongoDB...');
    const newBook = new Book({ title, review, wordCount: actualWordCount, cover });
    await newBook.save();

    console.log('Book saved successfully:', newBook);

    // Send the response with the saved book data
    res.status(201).json({ ...newBook.toObject(), cover });
 
  } catch (error) {
    console.error('Error processing request:', error); 
    res.status(500).json({ error: 'Failed to fetch review and save book' });
  } 
});

// GET endpoint for testing purposes
app.get('/', (req, res) => {
  res.send('Server is running.');
});

export default app;
