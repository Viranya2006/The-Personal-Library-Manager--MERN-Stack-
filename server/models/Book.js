const mongoose = require('mongoose');

/**
 * Book Schema - stores user's saved books with personal details
 */
const bookSchema = new mongoose.Schema(
  {
    googleBookId: {
      type: String,
      required: [true, 'Google Book ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    authors: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    previewLink: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Want to Read', 'Reading', 'Completed'],
      default: 'Want to Read',
    },
    personalReview: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  { timestamps: true }
);

/**
 * Unique index on googleBookId and user to prevent duplicates
 */
bookSchema.index({ googleBookId: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);
