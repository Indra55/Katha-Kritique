import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    review: String,
    wordCount: Number
});

const Book = mongoose.model('Book', bookSchema);

export default Book; // Export Book as default
 